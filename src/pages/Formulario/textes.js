import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validationSchema";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";

const Formscopy = () => {
  const [envio, setEnvio] = useState(false);

  const { register, handleSubmit, trigger, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    if (envio) return;
    setEnvio(true);
    try {
      const response = await fetch(
        "https://api-gestao-igreja.onrender.com/membros",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
          mode: "cors",
        }
      );

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        console.log(response.status);
        alert("Cadastro realizado com sucesso!");
        avançar("SectionOne");
      } else {
        alert("Erro no cadastro. Por favor, tente novamente.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEnvio(false);
    }
  };

  const buscaCep = async (e) => {
    const cep = e.target.value;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setValue("address", data.logradouro);
        setValue("district", data.bairro);
        setValue("city", data.localidade);
        setValue("state", data.uf);
      } else {
        alert("CEP não encontrado. Verifique e tente novamente.");
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao buscar o CEP. Tente novamente mais tarde.");
    }
  };

  const [show, setShow] = useState("SectionOne");

  const avançar = async (currentSection, nextSection) => {
    const result = await trigger(currentSection);
    if (result) {
      setShow(nextSection);
    }
  };

  return (
    <Container className="p-5 w-100 h-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        {show === "SectionOne" && (
          <Container style={{ height: "100vh" }}>
            <Row>
              <div className="p-3 mb-2 bg-primary-subtle text-center">
                <p className="fs-3">Dados Pessoais</p>
              </div>
              <label className="col-md-6 mb-4 ">
                <p className="n1">Nome Completo</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite o seu nome"
                  {...register("name")}
                />
                <p>{errors.name?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Telefone</p>
                <input
                  type="tel"
                  className="form-control"
                  mask="(00) 00000-0000"
                  placeholder="(00) 00000-0000"
                  {...register("telone")}
                />
                <p>{errors.telone?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">CEP</p>
                <input
                  type="text"
                  className="form-control"
                  {...register("cep")}
                  onBlur={buscaCep}
                />
                <p>{errors.cep?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Endereço</p>
                <input
                  type="text"
                  className="form-control"
                  {...register("address")}
                />
                <p>{errors.address?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Número</p>
                <input
                  className="form-control"
                  {...register("number")}
                />
                <p>{errors.number?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Complemento</p>
                <input
                  type="text"
                  className="form-control"
                  {...register("complement")}
                />
                <p>{errors.complement?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Bairro</p>
                <input
                  type="text"
                  className="form-control"
                  {...register("district")}
                />
                <p>{errors.district?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Cidade</p>
                <input
                  type="text"
                  className="form-control"
                  {...register("city")}
                />
                <p>{errors.city?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Estado</p>
                <input
                  type="text"
                  className="form-control"
                  {...register("state")}
                />
                <p>{errors.state?.message}</p>
              </label>
              <div className="col-xs2 py-5">
                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={() =>
                    avançar(
                      [
                        "name",
                        "telone",
                        "cep",
                        "address",
                        "number",
                        "complement",
                        "district",
                        "city",
                        "state",
                      ],
                      "SectionTwo"
                    )
                  }
                >
                  Avançar
                </button>
              </div>
            </Row>
          </Container>
        )}
        {show === "SectionTwo" && (
          <Container style={{ height: "100vh" }}>
            <Row>
              <div className="p-3 mb-2 bg-primary-subtle text-center">
                <p className="fs-3">Relacionamento</p>
              </div>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Estado Civil</p>
                <select className="form-control" {...register("estadocivil")}>
                  <option value="">Selecione</option>
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="Divorciado">Divorciado</option>
                </select>
                <p>{errors.estadocivil?.message}</p>
              </label>
              <label className="col-md">
                <p className="fs-6">Se não, justificar motivo</p>
                <textarea
                  {...register("justificativa")}
                  className="form-control"
                />
                <p>{errors.justificativa?.message}</p>
              </label>
              <Row>
                <Col className="col bd-highlight py-5">
                  <button
                    type="button"
                    className={`btn btn-primary mt-4 nav-Link`}
                    onClick={() => avançar("SectionOne")}
                  >
                    Voltar
                  </button>
                </Col>
                <Col className="col d-flex justify-content-end py-5">
                  <button
                    type="button"
                    className="btn btn-primary mt-4"
                    onClick={() =>
                      avançar(["estadocivil", "justificativa"], "SectionThree")
                    }
                  >
                    Avançar
                  </button>
                </Col>
              </Row>
            </Row>
          </Container>
        )}
        {show === "SectionThree" && (
          <Container style={{ height: "100vh" }}>
            <Row>
              <div className="p-3 mb-2 bg-primary-subtle text-center">
                <p className="fs-3">Religião</p>
              </div>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Batizado</p>
                <select className="form-control" {...register("baptized")}>
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                <p>{errors.baptized?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Batizado Com o Espírito Santo</p>
                <select
                  className="form-control"
                  {...register("baptizedHolySpirit")}
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                <p>{errors.baptizedHolySpirit?.message}</p>
              </label>
              <label className="col-md">
                <p className="fs-6">Se não, justificar motivo</p>
                <textarea
                  {...register("justifyBaptized")}
                  className="form-control"
                />
                <p>{errors.justifyBaptized?.message}</p>
              </label>
              <Row>
                <Col className="col bd-highlight py-5">
                  <button
                    type="button"
                    className="btn btn-primary mt-4 nav-Link"
                    onClick={() => avançar("SectionTwo")}
                  >
                    Voltar
                  </button>
                </Col>
                <Col className="col d-flex justify-content-end py-5">
                  <button type="submit" className="btn btn-primary mt-4">
                    Enviar
                  </button>
                </Col>
              </Row>
            </Row>
          </Container>
        )}
      </form>
    </Container>
  );
};

export default Formscopy;
