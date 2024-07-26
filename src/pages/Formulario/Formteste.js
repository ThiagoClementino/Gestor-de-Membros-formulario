import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { Container } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";

// Esquema de validação com Yup
const schema = yup
  .object({
    name: yup.string().required("Campo Obrigatório"),
    mothersname: yup.string().required("Campo Obrigatório"),
    fathersname: yup.string().required("Campo Obrigatório"),
    dateBirth: yup
      .date()
      .required("A data de nascimento é obrigatória")
      .min(
        new Date(1900, 0, 1),
        "A data de nascimento não pode ser antes de 01/01/1900"
      )
      .max(
        new Date(),
        "Data de nascimento não pode ser maior que a data atual"
      ),
    sex: yup.string().required("Campo Obrigatório"),
  })
  .required();

const Formteste = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [show, setShow] = useState("SectionOne");

  const avançar = async (fields, nextSection) => {
    const result = await trigger(fields);
    if (result) {
      setShow(nextSection);
    }
  };

  const onSubmit = (data) => console.log(data);

  return (
    <Container className="p-5 w-100 h-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        {show === "SectionOne" && (
          <section className="h-100">
            <div className="p-3 mb-2 bg-primary-subtle text-center">
              <p className="fs-3">Dados Pessoais</p>
            </div>
            <label className="col-md-6 mb-4">
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
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </label>

            <button
              type="button"
              onClick={() =>
                avançar(
                  ["name", "mothersname", "fathersname", "dateBirth", "sex"],
                  "SectionTwo"
                )
              }
            >
              Avançar 1
            </button>
          </section>
        )}

        {show === "SectionTwo" && (
          <section>
            <p>Seção 2</p>
            <button type="button" onClick={() => avançar([], "SectionThree")}>
              Avançar 2
            </button>
          </section>
        )}

        {show === "SectionThree" && (
          <section>
            <p>Seção 3</p>
            <button type="submit">Enviar</button>
          </section>
        )}
      </form>
    </Container>
  );
};

export default Formteste;
