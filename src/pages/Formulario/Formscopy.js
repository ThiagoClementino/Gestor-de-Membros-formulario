import React, { useState, useRef } from "react";
import { useForm,  } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from "./validationSchema";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
//Schema de validação para cada seção

const schema = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
  4: step4Schema,
  5: step5Schema,
};
//Schema de validação para cada seção

const Formscopy = () => {
  const [show, setShow] = useState(1); //exibir Seção

  const [envio, setEnvio] = useState(false); // Desabilitar submit após o envio

  // Configuração HookForm
  const {
    register,
    handleSubmit,
    trigger,

    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema[show]),
    defaultValues: {
      name: " ",
      mothersname: "",
      fathersname: "",
      dateBirth: "",
      sex: "",
      telone: "",
      teltwo: "",
      email: "",
      national: "",
      natural: "",
      profession: "",
      companywork: "",
      education: "",
      cep: "",
      address: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
      timeinresidence: "",
      estadocivil: "",
      conjuge: "",
      filhos: "",
      qtdfilhos: "",
      nomefilhoum: "",
      idadefilhoum: "",
      nomefilhodois: "",
      idadefilhodois: "",
      nomefilhotres: "",
      idadefilhotres: "",
      nomefilhoquatro: "",
      idadefilhoquatro: "",
      jobChurch: "",
      jobChurchTemp: "",
      congregacao: "",
      optionprimeirocasamento: "",
      casamentocristao: "",
      parceironaigreja: "",
      justificativa: "",
      databatismo: "",
      dataconversao: "",
      lastchurch: "",
      motivosaida: "",
      igrejasquefoimembro: "",
      dizimista: "",
      ofertante: "",
      cargoanterior: "",
      separadoanterior: "",
      posicaoanterior: "",
      atividadeanterior: "",
      problema: "",
      exortacao: "",
      discipulo: "",
      cultosdeoracao: "",
      participacaocultos: "",
      habito: "",
      aconselhamentopastoral: "",
      desenvolvimento: " ",
      conviccaodiscipulo: "",
      definicaoevangelho: "",
      frutosespirito: "",
      desenvolvimentodafe: "",
      pecado: "",
      conviccaoteologica: "",
      evangelizar: "",
      jejuar: "",
      leiturabiblica: "",
      livros: "",
      ultimasconsideracoes: "",
    },
  });
  // Configuração HookForm

  //API cep
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
  //API cep

  const avançar = async () => {
    const result = await trigger();
    if (result) {
      setShow((prevStep) => Math.min(prevStep + 1, 5));
    }
  };
  const voltar = () => {
    setShow((prevStep) => Math.max(prevStep - 1, 1));
  };

  //Correção

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  //Correção

  //Api Submit

  const onSubmit = async (data) => {
    const jsonString = JSON.stringify(data, getCircularReplacer());
    console.log("Form Data:", jsonString);
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
          body: jsonString,
          mode: "cors",
        }
      );

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        alert("Cadastro realizado com sucesso!");
        setShow("SectionOne");
      } else {
        alert("Erro no cadastro. Por favor, tente novamente.");
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar o formulário. Tente novamente mais tarde.");
    } finally {
      setEnvio(false);
    }
  };

  //Api Submit

  //Função Exibir QtdFilhos
  const [showField1, setShowField1] = useState(false);
  const [showField2, setShowField2] = useState(false);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setShowField1(selectedOption === "Sim");
    setShowField2(selectedOption === "Não");
    console.log(selectedOption)
  };

 



  const [filho1, setFilho1] = useState(false);
  const [filho2, setFilho2] = useState(false);
  const [filho3, setFilho3] = useState(false);
  const [filho4, setFilho4] = useState(false);

  const handleChildrem = (event) => {
    const dadoFilhos = event.target.value;
    setFilho1(dadoFilhos === "1");
    setFilho2(dadoFilhos === "2");
    setFilho3(dadoFilhos === "3");
    setFilho4(dadoFilhos === "4");
    console.log(dadoFilhos);
  };

 

  return (
    <Container className="p-5 w-100 h-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        {show === 1 && (
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
                <p className="fs-6">Nome da Mãe</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome da Mãe"
                  name="mothersname"
                  {...register("mothersname")}
                />
                <p>{errors.mothersname?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Nome do Pai</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome do Pai"
                  {...register("fathersname")}
                />
                <p>{errors.fathersname?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Data de nascimento</p>

                <input
                  type="date"
                  className="form-control"
                  {...register("dateBirth")}
                />
                <p>{errors.dateBirth?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Sexo</p>

                <select className="form-control" {...register("sex")}>
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
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
                <p className="fs-6">Telefone 2</p>
                <input
                  type="tel"
                  mask="(00) 00000-0000"
                  placeholder="(00) 00000-0000"
                  className="form-control"
                  {...register("teltwo")}
                />
                <p>{errors.teltwo?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">E-mail</p>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email@email.com"
                  {...register("email")}
                />
                <p>{errors.email?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Nacionalidade</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nacionalidade"
                  {...register("national")}
                />
                <p>{errors.national?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Naturalidade</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Naturalidade"
                  name="natural"
                  {...register("natural")}
                />
                <p>{errors.natural?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Profissão</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Qual é a sua profissão?"
                  {...register("profession")}
                />
                <p>{errors.profession?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Empresa que trabalha </p>
                <input
                  type="text"
                  className="form-control"
                  {...register("companywork")}
                />
                <p>{errors.companywork?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Grau de escolaridade</p>
                <select className="form-control" {...register("education")}>
                  <option>Selecione</option>
                  <option value="Ensino Fundamental">Ensino Fundamental</option>
                  <option value="Ensino Medio">Ensino Médio</option>
                  <option value="Ensino Superior">Ensino Superior</option>
                </select>
                <p>{errors.education?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">CEP</p>
                <input
                  type="text"
                  onBlur={buscaCep}
                  className="form-control"
                  {...register("cep")}
                />
                <p>{errors.cep?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Endereço</p>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  {...register("address")}
                />
                <p>{errors.address?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Número</p>
                <input
                  className="form-control"
                  name="number"
                  {...register("number")}
                />
                <p>{errors.number?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Complemento</p>
                <input
                  type="text"
                  className="form-control"
                  name="complement"
                  {...register("complement")}
                />
                <p>{errors.complement?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Bairro</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="district"
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
                  placeholder="Estado"
                  {...register("state")}
                />
                <p>{errors.state?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Quanto tempo está no mesmo endereço?</p>
                <input
                  type="text"
                  className="form-control"
                  name="timeinresidence"
                  {...register("timeinresidence")}
                />
                <p>{errors.timeinresidence?.message}</p>
              </label>
              <div className="col-xs2 py-5">
                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={avançar}
                >
                  Avançar
                </button>
              </div>
            </Row>
          </Container>
        )}
        {show === 2 && (
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
                  <option value="Divorciado">Divocriado</option>
                </select>
                <p>{errors.estadocivil?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Nome do Conjugê</p>
                <input
                  type="text"
                  className="form-control"
                  {...register("conjuge")}
                />
                <p>{errors.conjuge?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Possui Filhos</p>

                <select
                  className="form-control"
                  {...register("filhos")}
                  onChange={handleSelectChange}
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                <p>{errors.filhos?.message}</p>
              </label>
              {showField1 && (
                <Container className="mt-4 mb-4">
                  <label htmlFor="">
                    <p>Quantidade filhos</p>
                    <select
                    className="form-control"
                    {...register("qtdfilhos")}
                      onChange={handleChildrem}
                    >
                      <option value="">Selecione</option>
                      <option value="1">1 Filho</option>
                      <option value="2">2 Filhos</option>
                      <option value="3">3 Filhos</option>
                      <option value="4">4 Filhos</option>
                      <option value="5">Acima de 4 filhos</option>
                      
                    </select>
                      <p>{errors.qtdfilhos?.message}</p>
                  </label>
                </Container>
              )}
              {(filho1 || filho2 || filho3 || filho4) &&(
                <Container fluid className="mt-4 mb-4">
                  <h5>Dados dos filhos</h5>
                  {(filho1 || filho2 || filho3 || filho4) &&(
                  <Row  >
                    <h6>Dados do primeiro Filho</h6>
                    <Col xs={9}>
                      <input
                        type="text"
                        className="form-control"
                        {...register("nomefilhoum")}
                      />
                      <p>{errors.nomefilhoum?.message}</p>
                    </Col>
                    <Col xs={3}>
                      <input
                        type="number"
                        placeholder="Idade"
                        className="form-control col"
                        {...register("idadefilhoum", { max: 99, min: 0 })}
                      />
                      <p>{errors.idadefilhoum?.message}</p>
                    </Col>
                  </Row>
                  )}
                  {(filho2 || filho3 || filho4) &&(
                
                  <Row>
                    <h6>Dados do segundo Filho</h6>
                    <Col xs={9}>
                      <input
                        type="text"
                        className="form-control"
                        {...register("nomefilhodois")}
                      />
                      <p>{errors.nomefilhodois?.message}</p>
                    </Col>
                    <Col xs={3}>
                      <input
                        type="number"
                        className="form-control col"
                        placeholder="Idade"
                        {...register("idadefilhodois", { max: 99, min: 0 })}
                      />
                      <p>{errors.idadefilhodois?.message}</p>
                    </Col>
                  </Row>
                  )}
                  {(filho3 || filho4) &&(
                  <Row>
                    <h6>Dados do terceiro Filho</h6>
                    <Col xs={9}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Digite o nome do filho"
                        {...register("nomefilhotres")}
                      />
                      <p>{errors.nomefilhotres?.message}</p>
                    </Col>
                    <Col xs={3}>
                      <input
                        type="number"
                        className="form-control col"
                        placeholder="Idade"
                        {...register("idadefilhotres", { max: 99, min: 0 })}
                      />
                      <p>{errors.idadefilhotres?.message}</p>
                    </Col>
                  </Row>
                  )}
                  {filho4 &&(
                  <Row>
                    <h6>Dados do quarto Filho</h6>
                    <Col xs={9}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Digite o nome do filho"
                        {...register("nomefilhoquatro")}
                      />
                      <p>{errors.nomefilhoquatro?.message}</p>
                    </Col>
                    <Col xs={3}>
                      <input
                        type="number"
                        className="form-control col"
                        placeholder="Idade"
                        {...register("idadefilhoquatro", { max: 99, min: 0 })}
                      />
                      <p>{errors.idadefilhoquatro?.message}</p>
                    </Col>
                  </Row>
                  )}
                </Container>
                )}
              
              <label className="col-md-6 mb-4">
                <p className="fs-6">Qual cargo exerce no ministério</p>
                <input className="form-control" {...register("jobChurch")} />
                <p>{errors.jobChurch?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Exerce o cargo a quanto tempo?</p>
                <input
                  className="form-control"
                  type="date"
                  placeholder="Tempo de Cargo"
                  {...register("jobChurchTemp")}
                />
                <p>{errors.jobChurchTemp?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Primeiro Casamento?</p>

                <select
                  className="form-control"
                  {...register("optionprimeirocasamento")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
                <p>{errors.optionprimeirocasamento?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Casaram-se em cerimônia cristã?</p>

                <select
                  className="form-control"
                  {...register("casamentocristao")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
                <p>{errors.optionprimeirocasamento?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Nesse momento, seu cônjuge se tornará membro junto com você?
                </p>

                <select
                  className="form-control"
                  {...register("parceironaigreja")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
                <p>{errors.optionprimeirocasamento?.message}</p>
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
                    onClick={voltar}
                  >
                    Voltar
                  </button>
                </Col>
                <Col className="col d-flex justify-content-end py-5">
                  <button
                    type="button"
                    className="btn btn-primary mt-4"
                    onClick={avançar}
                  >
                    Avançar
                  </button>
                </Col>
              </Row>
            </Row>
          </Container>
        )}
        {show === 3 && (
          <Container style={{ height: "100vh" }}>
            <Row>
              <div className="p-3 mb-2 bg-primary-subtle text-center">
                <p className="fs-3">Histórico Cristão</p>
              </div>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Qual a foi a data de conversão</p>
                <input
                  type="date"
                  className="form-control"
                  {...register("dataconversao")}
                />
                <p>{errors.dataconversao?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Qual foi sua data de batismo nas águas</p>
                <input
                  type="date"
                  className="form-control"
                  {...register("databatismo")}
                />
                <p>{errors.databatismo?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Qual foi a sua última igreja?</p>
                <input
                  type="text"
                  className="form-control"
                  {...register("lastchurch")}
                />
                <p>{errors.lastchurch?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Por qual motivo você saiu dela?</p>
                <input
                  type="text"
                  className="form-control"
                  {...register("motivosaida")}
                />
                <p>{errors.motivosaida?.message}</p>
              </label>
              <label className="col-md-12 mb-4">
                <p className="fs-6">
                  Quais foram as igrejas que você foi membro desde a sua
                  conversão?
                </p>
                <textarea
                  {...register("igrejasquefoimembro")}
                  className="form-control"
                />
                <p>{errors.igrejasquefoimembro?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Você é dizimista fiel? </p>

                <select className="form-control" {...register("dizimista")}>
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>

                <p>{errors.dizimista?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Você é ofertante fiel? </p>
                <select className="form-control" {...register("ofertante")}>
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>

                <p>{errors.ofertante?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Você exerceu algum cargo de liderança nas igrejas que passou?
                </p>
                <select className="form-control" {...register("cargoanterior")}>
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                <p>{errors.cargoanterior?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Você foi separado/consagrado a algum cargo ministerial?
                </p>
                <select
                  className="form-control"
                  {...register("separadoanterior")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                <p>{errors.separadoanterior?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Qual era a sua posição</p>
                <input
                  type="text"
                  className="form-control"
                  {...register("posicaoanterior")}
                />
                <p>{errors.posicaoanterior?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Quais eram as suas atividades?</p>
                <input
                  type="text"
                  className="form-control"
                  {...register("atividadeanterior")}
                />
                <p>{errors.atividadeanterior?.message}</p>
              </label>

              <Row>
                <Col className="col bd-highlight py-5">
                  <button
                    type="button"
                    className="btn btn-primary mt-4"
                    onClick={voltar}
                  >
                    Voltar
                  </button>
                </Col>
                <Col className="col d-flex justify-content-end py-5">
                  <button
                    type="button"
                    className="btn btn-primary mt-4"
                    onClick={avançar}
                  >
                    Avançar
                  </button>
                </Col>
              </Row>
            </Row>
          </Container>
        )}
        {show === 4 && (
          <Container>
            <Row>
              <div className="p-3 mb-2 bg-primary-subtle text-center">
                <p className="fs-3">Histórico Congracional</p>
              </div>

              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Tem algum problema com liderança, hierarquia e pastoreio?
                </p>
                <select className="form-control" {...register("problema")}>
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>

                <p>{errors.problema?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Há problema em ser corrigido por conduta fora dos padrões
                  bíblicos?
                </p>
                <select className="form-control" {...register("exortacao")}>
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>

                <p>{errors.exortacao?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Você se considera um discípulo de Jesus com coração
                  pastoreável/ensinável?
                </p>
                <select className="form-control" {...register("discipulo")}>
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>

                <p>{errors.discipulo?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Tem o hábito de participar de cultos de estudo bíblico e EBDs?
                </p>
                <select
                  className="form-control"
                  {...register("participacaocultos")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>

                <p>{errors.participacaocultos?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Costuma informar seus pastores sobre ausências na adoração
                  coletiva?
                </p>
                <select className="form-control" {...register("habito")}>
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>

                <p>{errors.habito?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Tem o hábito de participar de cultos de oração?
                </p>
                <select
                  className="form-control"
                  {...register("cultosdeoracao")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>

                <p>{errors.cultosdeoracao?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Tem o hábito de buscar aconselhamento pastoral?
                </p>
                <select
                  className="form-control"
                  {...register("aconselhamentopastoral")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>

                <p>{errors.aconselhamentopastoral?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Valoriza o desenv. da vida em comunidade, congregar e servir
                  uns aos outros?
                </p>
                <select
                  className="form-control"
                  {...register("desenvolvimento")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>

                <p>{errors.desenvolvimento?.message}</p>
              </label>
              <Col className="col d-flex justify-content-start py-5">
                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={voltar}
                >
                  Voltar
                </button>
              </Col>
              <Col className="col d-flex justify-content-end py-5">
                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={avançar}
                >
                  Avançar
                </button>
              </Col>
            </Row>
          </Container>
        )}
        {show === 5 && (
          <Container>
            <Row>
              <div className="w-20">
                <p className="p-3 mb-2 fs-3 w-10 text-white  bg-primary text-center ">
                  Convicções
                </p>
              </div>

              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  O que te faz convicto de que você é um verdadeiro discípulo de
                  Jesus?
                </p>
                <textarea
                  placeholder="Digite seu texto aqui"
                  {...register("conviccaodiscipulo")}
                  className="form-control"
                />

                <p>{errors.conviccaodiscipulo?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Como você define o evangelho?</p>
                <textarea
                  placeholder="Digite seu texto aqui"
                  {...register("definicaoevangelho")}
                  className="form-control"
                />

                <p>{errors.definicaoevangelho?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Quais frutos do Espírito que podem ser claramente percebidos
                  na vida?
                </p>
                <textarea
                  placeholder="Digite seu texto aqui"
                  {...register("frutosespirito")}
                  className="form-control"
                />

                <p>{errors.frutosespirito?.message}</p>
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Como cuida do desenvolvimento e sua fé e da sua comunhão com
                  Deus?
                </p>
                <textarea
                  placeholder="Digite seu texto aqui"
                  {...register("desenvolvimentodafe")}
                  className="form-control"
                />

                <p>{errors.desenvolvimentodafe?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Existe algum pecado contra qual você tenha lutado nos últimos
                  anos?
                </p>
                <textarea
                  placeholder="Digite seu texto aqui"
                  {...register("pecado")}
                  className="form-control"
                />

                <p>{errors.pecado?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Você tem convicções teológicas? Quais seriam?
                </p>
                <textarea
                  placeholder="Digite seu texto aqui"
                  {...register("conviccaoteologica")}
                  className="form-control"
                />
                <p>{errors.conviccaoteologica?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Você tem o hábito de evangelizar?</p>
                <textarea
                  placeholder="Digite seu texto aqui"
                  {...register("evangelizar")}
                  className="form-control"
                />
                <p>{errors.evangelizar?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Você tem o hábito de jejuar?</p>
                <textarea
                  placeholder="Digite seu texto aqui"
                  {...register("jejuar")}
                  className="form-control"
                />
                <p>{errors.jejuar?.message}</p>
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Quais os últimos 3 livros que você leu que edificaram a sua
                  fé?
                </p>
                <input
                  className="form-control"
                  type="text"
                  {...register("livros")}
                />
                <p>{errors.register?.message}</p>
              </label>
              <label className="col-md-12 mb-4">
                <p className="fs-6">
                  Tem alguma coisa a mais que você queria nos contar?
                </p>
                <textarea
                  placeholder="Digite seu texto aqui"
                  {...register("ultimasconsideracoes")}
                  className="form-control"
                />
                <p>{errors.ultimasconsideracoes?.message}</p>
              </label>
            </Row>
            <Row>
              <Col className="col bd-highlight py-5">
                <button
                  type="button"
                  className="btn btn-primary lg mt-4"
                  onClick={voltar}
                >
                  Voltar
                </button>
              </Col>
              <Col className="col d-flex justify-content-end py-5">
                <button
                  disabled={envio}
                  className="btn btn-primary mt-4 "
                  data-bs-dismiss="toast"
                  type="submit"
                  onClick={onSubmit}
                >
                  {envio ? "Enviando..." : "Enviar"}
                </button>
              </Col>
            </Row>
          </Container>
        )}
      </form>
    </Container>
  );
};

export default Formscopy;
