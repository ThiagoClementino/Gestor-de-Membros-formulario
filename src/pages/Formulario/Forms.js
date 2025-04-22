import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Importe o validationSchema existente
import validationSchema from "./validationSchema";

const Forms = () => {
  const [envio, setEnvio] = useState(false);
  const [exibir, setExibir] = useState("secao1");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    trigger // Importe a função trigger
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      mothersname: "",
      fathersname: "",
      dateBirth: "",
      sex: "",
      telone: "",
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
      qtdfilhos: "0",
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
      optionprimeirocasamento: "",
      casamentocristao: "",
      parceironaigreja: "",
      justificativa: "",
      dataconversao: "",
      databatismo: "",
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
      desenvolvimento: "",
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

  const watchFilhos = watch("filhos");
  const watchQtdFilhos = watch("qtdfilhos");
  const watchParceiroIgreja = watch("parceironaigreja");
  const watchCargoAnterior = watch("cargoanterior");
  const watchSeparadoAnterior = watch("separadoanterior");

  const handleSubmitSecao = (secao) => async () => {
    let camposDaSecao = [];

    if (secao === "secao1") {
      camposDaSecao = [
        'name', 'mothersname', 'fathersname', 'dateBirth', 'sex', 'telone', 'email',
        'national', 'natural', 'profession', 'companywork', 'education', 'cep',
        'address', 'number', 'complement', 'district', 'city', 'state', 'timeinresidence'
      ];
    } else if (secao === "secao2") {
      camposDaSecao = [
        'estadocivil', 'conjuge', 'filhos', 'qtdfilhos', 'nomefilhoum', 'idadefilhoum',
        'nomefilhodois', 'idadefilhodois', 'nomefilhotres', 'idadefilhotres',
        'nomefilhoquatro', 'idadefilhoquatro', 'jobChurch', 'jobChurchTemp',
        'optionprimeirocasamento', 'casamentocristao', 'parceironaigreja', 'justificativa'
      ];
    } else if (secao === "secao3") {
      camposDaSecao = [
        'dataconversao', 'databatismo', 'lastchurch', 'motivosaida',
        'igrejasquefoimembro', 'dizimista', 'ofertante', 'cargoanterior',
        'separadoanterior', 'posicaoanterior', 'atividadeanterior'
      ];
    } else if (secao === "secao4") {
      camposDaSecao = [
        'problema', 'exortacao', 'discipulo', 'cultosdeoracao',
        'participacaocultos', 'habito', 'aconselhamentopastoral', 'desenvolvimento'
      ];
    } else if (secao === "secao5") {
      camposDaSecao = [
        'conviccaodiscipulo', 'definicaoevangelho', 'frutosespirito',
        'desenvolvimentodafe', 'pecado', 'conviccaoteologica', 'evangelizar',
        'jejuar', 'leiturabiblica', 'livros', 'ultimasconsideracoes'
      ];
    }

    const isValid = await trigger(camposDaSecao);
    if (isValid) {
      setExibir(secao);
    } else {
      alert("Por favor, preencha todos os campos obrigatórios desta seção.");
    }
  };

  const handleSubmitForm = async (values) => {
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
          body: JSON.stringify(values),
          mode: "cors",
        }
      );

      const json = await response.json();
      console.log(json);
      console.log(response.status);
      console.log(values);
      alert("Cadastro Realizado com sucesso!");
      setExibir("secao1");
    } catch (error) {
      console.log(error);
    } finally {
      setEnvio(false);
    }
  };

  const buscaCep = async (e) => {
    const cep = e.target.value.replace("-", "");
    if (cep.length !== 8) {
      return;
    }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setValue("address", data.logradouro || "");
        setValue("district", data.bairro || "");
        setValue("city", data.localidade || "");
        setValue("state", data.uf || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="p-5 w-100 h-100">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {exibir === `secao1` && (
          <Container style={{ height: "100%" }}>
            <Row>
              <div className="p-3 mb-2 bg-primary-subtle text-center">
                <p className="fs-3">Dados Pessoais</p>
              </div>
              <label className="col-md-6 mb-4 ">
                <p className="n1">Nome Completo</p>
                <input
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  placeholder="Digite o seu nome"
                  type="text"
                  {...register("name")}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Nome da Mãe</p>
                <input
                  className={`form-control ${errors.mothersname ? "is-invalid" : ""}`}
                  type="text"
                  placeholder="Nome da Mãe"
                  id="mothersname"
                  {...register("mothersname")}
                />
                {errors.mothersname && (
                  <div className="invalid-feedback">
                    {errors.mothersname.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Nome do Pai</p>
                <input
                  className={`form-control ${
                    errors.fathersname ? "is-invalid" : ""
                  }`}
                  type="text"
                  placeholder="Nome do Pai"
                  id="fathersname"
                  {...register("fathersname")}
                />
                {errors.fathersname && (
                  <div className="invalid-feedback">
                    {errors.fathersname.message}
                  </div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Data de nascimento</p>
                <IMaskInput
                  {...register("dateBirth")}
                  className={`form-control ${
                    errors.dateBirth ? "is-invalid" : ""
                  }`}
                  type="text"
                  placeholder="DD/MM/AAAA"
                  mask="00/00/0000"
                />
                {errors.dateBirth && (
                  <div className="invalid-feedback">
                    {errors.dateBirth.message}
                  </div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Sexo</p>
                <select
                  className={`form-control ${errors.sex ? "is-invalid" : ""}`}
                  id="sex"
                  {...register("sex")}
                >
                  <option value="">Escolha</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
                {errors.sex && (
                  <div className="invalid-feedback">{errors.sex.message}</div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Telefone 1</p>
                <IMaskInput
                  {...register("telone")}
                  className={`form-control ${
                    errors.telone ? "is-invalid" : ""
                  }`}
                  type="text"
                  mask="(00) 00000-0000"
                  placeholder="(00) 00000-0000"
                />
                {errors.telone && (
                  <div className="invalid-feedback">
                    {errors.telone.message}
                  </div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Telefone 2</p>
                <IMaskInput
                  {...register("teltwo")}
                  className="form-control"
                  type="text"
                  mask="(00) 00000-0000"
                  placeholder="(00) 00000-0000"
                />
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">E-mail</p>
                <input
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  type="email"
                  placeholder="email@email.com"
                  id="email"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Nacionalidade</p>
                <input
                  className={`form-control ${
                    errors.national ? "is-invalid" : ""
                  }`}
                  type="text"
                  placeholder="Nacionalidade"
                  id="national"
                  {...register("national")}
                />
                {errors.national && (
                  <div className="invalid-feedback">
                    {errors.national.message}
                  </div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Naturalidade</p>
                <input
                  className={`form-control ${
                    errors.natural ? "is-invalid" : ""
                  }`}
                  type="text"
                  placeholder="Naturalidade"
                  id="natural"
                  {...register("natural")}
                />
                {errors.natural && (
                  <div className="invalid-feedback">
                    {errors.natural.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Profissão</p>
                <input
                  className={`form-control ${
                    errors.profession ? "is-invalid" : ""
                  }`}
                  type="text"
                  placeholder=""
                  id="profession"
                  {...register("profession")}
                />
                {errors.profession && (
                  <div className="invalid-feedback">
                    {errors.profession.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Empresa que trabalha </p>
                <input
                  className={`form-control ${
                    errors.companywork ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="companywork"
                  {...register("companywork")}
                />
                {errors.companywork && (
                  <div className="invalid-feedback">
                    {errors.companywork.message}
                  </div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Grau de escolaridade</p>
                <select
                  className={`form-control ${
                    errors.education ? "is-invalid" : ""
                  }`}
                  aria-label="Default select example"
                  id="education"
                  {...register("education")}
                >
                  {" "}
                  <option value="">Escolha</option>
                  <option value="Ensino Fundamental">Ensino Fundamental</option>
                  <option value="Ensino Medio">Ensino Médio</option>
                  <option value="Ensino Superior">Ensino Superior</option>
                </select>
                {errors.education && (
                  <div className="invalid-feedback">
                    {errors.education.message}
                  </div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">CEP</p>
                <IMaskInput
                  {...register("cep")}
                  className={`form-control ${errors.cep ? "is-invalid" : ""}`}
                  mask="00000-000"
                  type="text"
                  placeholder="CEP"
                  onBlur={buscaCep}
                />
                {errors.cep && (
                  <div className="invalid-feedback">{errors.cep.message}</div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Endereço</p>
                <input
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="address"
                  {...register("address")}
                />
                {errors.address && (
                  <div className="invalid-feedback">
                    {errors.address.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Número</p>
                <input
                  className={`form-control ${
                    errors.number ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="number"
                  {...register("number")}
                />
                {errors.number && (
                  <div className="invalid-feedback">
                    {errors.number.message}
                  </div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Complemento</p>
                <input
                  className="form-control"
                  type="text"
                  id="complement"
                  {...register("complement")}
                />
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Bairro</p>
                <input
                  className={`errors.district ? "is-invalid" : ""
                }`}
                  type="text"
                  placeholder="district"
                  id="district"
                  {...register("district")}
                />
                {errors.district && (
                  <div className="invalid-feedback">
                    {errors.district.message}
                  </div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Cidade</p>
                <input
                  className={`form-control ${errors.city ? "is-invalid" : ""}`}
                  type="text"
                  id="city"
                  {...register("city")}
                />
                {errors.city && (
                  <div className="invalid-feedback">{errors.city.message}</div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Estado</p>
                <input
                  className={`form-control ${errors.state ? "is-invalid" : ""}`}
                  type="text"
                  placeholder="Estado"
                  id="state"
                  {...register("state")}
                />
                {errors.state && (
                  <div className="invalid-feedback">{errors.state.message}</div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Quanto tempo está no mesmo endereço?</p>
                <input
                  className="form-control"
                  type="text"
                  id="timeinresidence"
                  {...register("timeinresidence")}
                />
              </label>
              <div className="col-xs2 py-5">
                <button
                  type="button"
                  className={`btn btn-primary mt-4 nav-Link ${
                    exibir === "secao1" ? "active" : ""
                  }`}
                  onClick={() => handleSubmitSecao("secao2")}
                >
                  Avançar
                </button>
              </div>
            </Row>
          </Container>
        )}
        {exibir === `secao2` && (
          <Container style={{ height: "100%" }}>
            <Row>
              <div className="p-3 mb-2 bg-primary-subtle text-center">
                <p className="fs-3">Relacionamento</p>
              </div>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Estado Civil</p>
                <select
                  className={`form-control ${
                    errors.estadocivil ? "is-invalid" : ""
                  }`}
                  id="estadocivil"
                  {...register("estadocivil")}
                >
                  <option value="">Selecione</option>
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="Divorciado">Divocriado</option>
                </select>
                {errors.estadocivil && (
                  <div className="invalid-feedback">
                    {errors.estadocivil.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Nome do Conjugê</p>
                <input
                  className="form-control"
                  type="text"
                  id="conjuge"
                  placeholder="Digite o nome do conjugê"
                  {...register("conjuge")}
                />
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Possui Filhos</p>
                <select
                  className={`form-control ${errors.filhos ? "is-invalid" : ""}`}
                  id="filhos"
                  {...register("filhos")}
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Nao">Não</option>
                </select>
                {errors.filhos && (
                  <div className="invalid-feedback">{errors.filhos.message}</div>
                )}
              </label>

              {watchFilhos === "Sim" && (
                <label className="col-md-6 mb-4">
                  <p className="fs-6">Quantidade de filhos</p>
                  <select
                    className={`form-control ${
                      errors.qtdfilhos ? "is-invalid" : ""
                    }`}
                    id="qtdfilhos"
                    {...register("qtdfilhos")}
                  >
                    <option value="0">Selecione</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="acima de quatro">Acima de quatro</option>
                  </select>
                  {errors.qtdfilhos && (
                    <div className="invalid-feedback">
                      {errors.qtdfilhos.message}
                    </div>
                  )}
                </label>
              )}

              {parseInt(watchQtdFilhos, 10) > 0 &&
                parseInt(watchQtdFilhos, 10) <= 4 && (
                  <Container fluid className=" mt-4 mb-4">
                    <h5>Dados do filhos</h5>
                    {parseInt(watchQtdFilhos, 10) >= 1 && (
                      <Row>
                        <h6>Dados do primeiro Fiho</h6>
                        <Col xs={9}>
                          <input
                            className="form-control"
                            type="text"
                            id="nomefilhoum"
                            placeholder="Digite o nome do filho"
                            {...register("nomefilhoum")}
                          />
                        </Col>
                        <Col xs={3}>
                          <input
                            className="form-control col"
                            type="number"
                            id="idadefilhoum"
                            placeholder="idade"
                            {...register("idadefilhoum")}
                          />
                        </Col>
                      </Row>
                    )}
                    {parseInt(watchQtdFilhos, 10) >= 2 && (
                      <Row className="mt-2">
                        <h6>Dados do segundo Fiho</h6>
                        <Col xs={9}>
                          <input
                            className="form-control"
                            type="text"
                            id="nomefilhodois"
                            placeholder="Digite o nome do filho"
                            {...register("nomefilhodois")}
                          />
                        </Col>
                        <Col xs={3}>
                          <input
                            className="form-control"
                            type="number"
                            id="idadefilhodois"
                            placeholder="idade"
                            {...register("idadefilhodois")}
                          />
                        </Col>
                      </Row>
                    )}
                    {parseInt(watchQtdFilhos, 10) >= 3 && (
                      <Row className="mt-2">
                        <h6>Dados do terceiro Fiho</h6>
                        <Col xs={9}>
                          <input
                            className="form-control col"
                            type="text"
                            id="nomefilhotres"
                            placeholder="Digite o nome do filho"
                            {...register("nomefilhotres")}
                          />
                        </Col>
                        <Col xs={3}>
                          <input
                            className="form-control col"
                            type="number"
                            id="idadefilhotres"
                            placeholder="idade"
                            {...register("idadefilhotres")}
                          />
                        </Col>
                      </Row>
                    )}
                    {parseInt(watchQtdFilhos, 10) >= 4 && (
                      <Row className="mt-2">
                        <h6>Dados do quarto Fiho</h6>
                        <Col xs={9}>
                          <input
                            className="form-control col"
                            type="text"
                            id="nomefilhoquatro"
                            placeholder="Digite o nome do filho"
                            {...register("nomefilhoquatro")}
                          />
                        </Col>
                        <Col xs={3}>
                          <input
                            className="form-control col"
                            type="number"
                            id="idadefilhoquatro"
                            placeholder="idade"
                            {...register("idadefilhoquatro")}
                          />
                        </Col>
                      </Row>
                    )}
                  </Container>
                )}

              <label className="col-md-6 mb-4">
                <p className="fs-6">Qual cargo exerce no ministério</p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Cargo"
                  id="jobChurch"
                  {...register("jobChurch")}
                />
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Exerce o cargo a quanto tempo?</p>
                <input
                  className="form-control"
                  type="date"
                  placeholder="Tempo de Cargo"
                  id="jobChurchTemp"
                  {...register("jobChurchTemp")}
                />
              </label>
              {/* <label className="col-md-6 mb-4">
                <p className="fs-6">Qual congregação você pertence?</p>
                <select
                  className="form-control"
                  name="congregacao"
                  id="congregacao"
                >
                  <option value="">Selecione</option>
                  <option value="105">105</option>
                  <option value="110">110</option>
                  <option value="qnq">Qnq</option>
                  <option value="recanto">Recanto</option>
                  <option value="sede">Sede</option>
                </select>
              </label> */}

              <label className="col-md-6 mb-4">
                <p className="fs-6">Primeiro Casamento?</p>
                <select
                  className={`form-control ${
                    errors.optionprimeirocasamento ? "is-invalid" : ""
                  }`}
                  id="optionprimeirocasamento"
                  {...register("optionprimeirocasamento")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
                {errors.optionprimeirocasamento && (
                  <div className="invalid-feedback">
                    {errors.optionprimeirocasamento.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Casaram-se em cerimônia cristã?</p>
                <select
                  className={`form-control ${
                    errors.casamentocristao ? "is-invalid" : ""
                  }`}
                  id="casamentocristao"
                  {...register("casamentocristao")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
                {errors.casamentocristao && (
                  <div className="invalid-feedback">
                    {errors.casamentocristao.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Nesse momento, seu cônjuge se tornará membro junto com você?
                </p>
                <select
                  className={`form-control ${
                    errors.parceironaigreja ? "is-invalid" : ""
                  }`}
                  id="parceironaigreja"
                  {...register("parceironaigreja")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
                {errors.parceironaigreja && (
                  <div className="invalid-feedback">
                    {errors.parceironaigreja.message}
                  </div>
                )}
              </label>
              {watchParceiroIgreja === "nao" && (
                <label className="col-md">
                  <p className="fs-6">Se não, justificar motivo</p>
                  <textarea
                    className="form-control"
                    id="justificativa"
                    cols="48"
                    rows="5"
                    {...register("justificativa")}
                  />
                </label>
              )}

              <Row>
                <Col className="col bd-highlight py-5">
                  <button
                    type="button"
                    className={`btn btn-primary mt-4 nav-Link ${
                      exibir === "secao2" ? "active" : ""
                    }`}
                    onClick={() => handleSubmitSecao("secao1")}
                  >
                    Voltar
                  </button>
                </Col>
                <Col className="col d-flex justify-content-end py-5">
                  <button
                    type="button"
                    className={`btn btn-primary mt-4 nav-Link ${
                      exibir === "secao2" ? "active" : ""
                    }`}
                    onClick={() => handleSubmitSecao("secao3")}
                  >
                    Avançar
                  </button>
                </Col>
              </Row>
            </Row>
          </Container>
        )}
        {exibir === `secao3` && (
          <Container>
            <Row>
              <div className="p-3 mb-2 bg-primary-subtle text-center">
                <p className="fs-3">Histórico Cristão</p>
              </div>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Qual a foi a data de conversão</p>
                <IMaskInput
                  {...register("dataconversao")}
                  className={`form-control ${
                    errors.dataconversao ? "is-invalid" : ""
                  }`}
                  type="text"
                  placeholder="DD/MM/AAAA"
                  mask="00/00/0000"
                />
                {errors.dataconversao && (
                  <div className="invalid-feedback">
                    {errors.dataconversao.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Qual foi sua data de batismo nas águas</p>
                <IMaskInput
                  {...register("databatismo")}
                  className={`form-control ${
                    errors.databatismo ? "is-invalid" : ""
                  }`}
                  type="text"
                  placeholder="DD/MM/AAAA"
                  mask="00/00/0000"
                />
                {errors.databatismo && (
                  <div className="invalid-feedback">
                    {errors.databatismo.message}
                  </div>
                )}
              </label>

              <label className="col-md-6 mb-4">
                <p className="fs-6">Qual foi a sua última igreja?</p>
                <input
                  className="form-control"
                  type="text"
                  {...register("lastchurch")}
                />
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Por qual motivo você saiu dela?</p>
                <input
                  className="form-control"
                  type="text"
                  {...register("motivosaida")}
                />
              </label>
              <label className="col-md-12 mb-4">
                <p className="fs-6">
                  Quais foram as igrejas que você foi membro desde a sua
                  conversão?
                </p>
                <textarea
                  className="form-control"
                  id="igrejasquefoimembro"
                  cols="80"
                  rows="2"
                  {...register("igrejasquefoimembro")}
                />
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Você é dizimista fiel? </p>
                <select
                  className={`form-control ${
                    errors.dizimista ? "is-invalid" : ""
                  }`}
                  id="dizimista"
                  {...register("dizimista")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.dizimista && (
                  <div className="invalid-feedback">
                    {errors.dizimista.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Você é ofertante fiel? </p>
                <select
                  className={`form-control ${
                    errors.ofertante ? "is-invalid" : ""
                  }`}
                  id="ofertante"
                  {...register("ofertante")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                  </select>
                {errors.ofertante && (
                  <div className="invalid-feedback">
                    {errors.ofertante.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Você exerceu algum cargo de liderança nas igrejas que passou?
                </p>
                <select
                  className={`form-control ${
                    errors.cargoanterior ? "is-invalid" : ""
                  }`}
                  id="cargoanterior"
                  {...register("cargoanterior")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
                {errors.cargoanterior && (
                  <div className="invalid-feedback">
                    {errors.cargoanterior.message}
                  </div>
                )}
              </label>

              {watchCargoAnterior === "sim" && (
                <>
                  <label className="col-md-6 mb-4">
                    <p className="fs-6">Qual era a sua posição</p>
                    <input
                      className="form-control"
                      type="text"
                      id="posicaoanterior"
                      {...register("posicaoanterior")}
                    />
                  </label>
                  <label className="col-md-6 mb-4">
                    <p className="fs-6">Quais eram as suas atividades?</p>
                    <input
                      className="form-control"
                      type="text"
                      id="atividadeanterior"
                      {...register("atividadeanterior")}
                    />
                  </label>
                </>
              )}

              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Você foi separado/consagrado a algum cargo ministerial?
                </p>
                <select
                  className={`form-control ${
                    errors.separadoanterior ? "is-invalid" : ""
                  }`}
                  id="separadoanterior"
                  {...register("separadoanterior")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.separadoanterior && (
                  <div className="invalid-feedback">
                    {errors.separadoanterior.message}
                  </div>
                )}
              </label>

              {watchSeparadoAnterior === "sim" && (
                <label className="col-md-6 mb-4">
                  <p className="fs-6">Qual era a sua posição</p>
                  <input
                    className="form-control"
                    type="text"
                    id="posicaoanterior"
                    {...register("posicaoanterior")}
                  />
                </label>
              )}

              <Row>
                <Col className="col bd-highlight py-5">
                  <button
                    type="button"
                    className={`btn btn-primary mt-4 nav-Link ${
                      exibir === "secao3" ? "active" : ""
                    }`}
                    onClick={() => handleSubmitSecao("secao2")}
                  >
                    Voltar
                  </button>
                </Col>
                <Col className="col d-flex justify-content-end py-5">
                  <button
                    type="button"
                    className={`btn btn-primary mt-4 nav-Link ${
                      exibir === "secao3" ? "active" : ""
                    }`}
                    onClick={() => handleSubmitSecao("secao4")}
                  >
                    Avançar
                  </button>
                </Col>
              </Row>
            </Row>
          </Container>
        )}
        {exibir === `secao4` && (
          <Container>
            <Row>
              <div className="p-3 mb-2 bg-primary-subtle text-center">
                <p className="fs-3">Histórico Congracional</p>
              </div>

              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Tem algum problema com liderança, hierarquia e pastoreio?
                </p>
                <select
                  className={`form-control ${
                    errors.problema ? "is-invalid" : ""
                  }`}
                  id="problema"
                  {...register("problema")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.problema && (
                  <div className="invalid-feedback">
                    {errors.problema.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Há problema em ser corrigido por conduta fora dos padrões
                  bíblicos?
                </p>
                <select
                  className={`form-control ${
                    errors.exortacao ? "is-invalid" : ""
                  }`}
                  id="exortacao"
                  {...register("exortacao")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.exortacao && (
                  <div className="invalid-feedback">
                    {errors.exortacao.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Você se considera um discípulo de Jesus com coração
                  pastoreável/ensinável?
                </p>
                <select
                  className={`form-control ${
                    errors.discipulo ? "is-invalid" : ""
                  }`}
                  id="discipulo"
                  {...register("discipulo")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.discipulo && (
                  <div className="invalid-feedback">
                    {errors.discipulo.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Tem o hábito de participar de cultos de estudo bíblico e EBDs?
                </p>
                <select
                  className={`form-control ${
                    errors.participacaocultos ? "is-invalid" : ""
                  }`}
                  id="participacaocultos"
                  {...register("participacaocultos")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.participacaocultos && (
                  <div className="invalid-feedback">
                    {errors.participacaocultos.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Costuma informar seus pastores sobre ausências na adoração
                  coletiva?
                </p>
                <select
                  className={`form-control ${errors.habito ? "is-invalid" : ""}`}
                  id="habito"
                  {...register("habito")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.habito && (
                  <div className="invalid-feedback">{errors.habito.message}</div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Tem o hábito de participar de cultos de oração?
                </p>
                <select
                  className={`form-control ${
                    errors.cultosdeoracao ? "is-invalid" : ""
                  }`}
                  id="cultosdeoracao"
                  {...register("cultosdeoracao")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.cultosdeoracao && (
                  <div className="invalid-feedback">
                    {errors.cultosdeoracao.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Tem o hábito de buscar aconselhamento pastoral?
                </p>
                <select
                  className={`form-control ${
                    errors.aconselhamentopastoral ? "is-invalid" : ""
                  }`}
                  id="aconselhamentopastoral"
                  {...register("aconselhamentopastoral")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.aconselhamentopastoral && (
                  <div className="invalid-feedback">
                    {errors.aconselhamentopastoral.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Valoriza o desenv. da vida em comunidade, congregar e servir
                  uns aos outros?
                </p>
                <select
                  className={`form-control ${
                    errors.desenvolvimento ? "is-invalid" : ""
                  }`}
                  id="desenvolvimento"
                  {...register("desenvolvimento")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.desenvolvimento && (
                  <div className="invalid-feedback">
                    {errors.desenvolvimento.message}
                  </div>
                )}
              </label>
              <Col className="col d-flex justify-content-start py-5">
                <button
                  type="button"
                  className={`btn btn-primary mt-4 nav-Link ${
                    exibir === "secao4" ? "active" : ""
                  }`}
                  onClick={() => handleSubmitSecao("secao3")}
                >
                  Voltar
                </button>
              </Col>
              <Col className="col d-flex justify-content-end py-5">
                <button
                  type="button"
                  className={`btn btn-primary mt-4 nav-Link ${
                    exibir === "secao4" ? "active" : ""
                  }`}
                  onClick={() => handleSubmitSecao("secao5")}
                >
                  Avançar
                </button>
              </Col>
            </Row>
          </Container>
        )}
        {exibir === `secao5` && (
          <Container>
            <Row>
              <div className="w-20">
                <p className="p-3mb-2 fs-3 w-10 text-white   bg-primary text-center ">
                  Convicções
                </p>
              </div>

              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  O que te faz convicto de que você é um verdadeiro discípulo de
                  Jesus?
                </p>

                <textarea
                  className={`form-control ${
                    errors.conviccaodiscipulo ? "is-invalid" : ""
                  }`}
                  id="conviccaodiscipulo"
                  cols="100"
                  rows="5"
                  {...register("conviccaodiscipulo")}
                />
                {errors.conviccaodiscipulo && (
                  <div className="invalid-feedback">
                    {errors.conviccaodiscipulo.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Como você define o evangelho?</p>
                <textarea
                  className={`form-control ${
                    errors.definicaoevangelho ? "is-invalid" : ""
                  }`}
                  id="definicaoevangelho"
                  cols="100"
                  rows="5"
                  {...register("definicaoevangelho")}
                />
                {errors.definicaoevangelho && (
                  <div className="invalid-feedback">
                    {errors.definicaoevangelho.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Quais frutos do Espírito que podem ser claramente percebidos
                  na vida?
                </p>

                <textarea
                  className={`form-control ${
                    errors.frutosespirito ? "is-invalid" : ""
                  }`}
                  id="frutosespirito"
                  cols="100"
                  rows="5"
                  {...register("frutosespirito")}
                />
                {errors.frutosespirito && (
                  <div className="invalid-feedback">
                    {errors.frutosespirito.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Como cuida do desenvolvimento e sua fé e da sua comunhão com
                  Deus?
                </p>

                <textarea
                  className={`form-control ${
                    errors.desenvolvimentodafe ? "is-invalid" : ""
                  }`}
                  id="desenvolvimentodafer"
                  cols="100"
                  rows="5"
                  {...register("desenvolvimentodafe")}
                />
                {errors.desenvolvimentodafe && (
                  <div className="invalid-feedback">
                    {errors.desenvolvimentodafe.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Existe algum pecado contra qual você tenha lutado nos últimos
                  anos?
                </p>

                <textarea
                  className={`form-control ${errors.pecado ? "is-invalid" : ""}`}
                  id="pecado"
                  cols="100"
                  rows="5"
                  {...register("pecado")}
                />
                {errors.pecado && (
                  <div className="invalid-feedback">{errors.pecado.message}</div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Você tem convicções teológicas? Quais seriam?
                </p>

                <textarea
                  className={`form-control ${
                    errors.conviccaoteologica ? "is-invalid" : ""
                  }`}
                  id="conviccaoteologica"
                  cols="100"
                  rows="5"
                  {...register("conviccaoteologica")}
                />
                {errors.conviccaoteologica && (
                  <div className="invalid-feedback">
                    {errors.conviccaoteologica.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Você tem o hábito de evangelizar?</p>
                <select
                  className={`form-control ${
                    errors.evangelizar ? "is-invalid" : ""
                  }`}
                  id="evangelizar"
                  {...register("evangelizar")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.evangelizar && (
                  <div className="invalid-feedback">
                    {errors.evangelizar.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Você tem o hábito de jejuar?</p>
                <select
                  className={`form-control ${errors.jejuar ? "is-invalid" : ""}`}
                  id="jejuar"
                  {...register("jejuar")}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.jejuar && (
                  <div className="invalid-feedback">{errors.jejuar.message}</div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">Você já leu a bíblia toda alguma vez?</p>
                <select
                  className={`form-control ${
                    errors.leiturabiblica ? "is-invalid" : ""
                  }`}
                  id="leiturabiblica"
                  {...register("leiturabiblica")}
                >
                 <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.leiturabiblica && (
                  <div className="invalid-feedback">
                    {errors.leiturabiblica.message}
                  </div>
                )}
              </label>
              <label className="col-md-6 mb-4">
                <p className="fs-6">
                  Quais os últimos 3 livros que você leu que edificaram a sua
                  fé?
                </p>
                <input
                  className="form-control"
                  type="text"
                  id="livros"
                  {...register("livros")}
                />
              </label>
              <label className="col-md-12 mb-4">
                <p className="fs-6">
                  Tem alguma coisa a mais que você queria nos contar?
                </p>

                <textarea
                  className="form-control"
                  id="ultimasconsideracoes"
                  cols="100"
                  rows="5"
                  type="text"
                  {...register("ultimasconsideracoes")}
                />
              </label>
            </Row>
            <Row>
              <Col className="col bd-highlight py-5">
                <button
                  type="button"
                  size=""
                  className={`btn btn-primary lg mt-4 nav-Link ${
                    exibir === "secao5" ? "active" : ""
                  }`}
                  onClick={() => handleSubmitSecao("secao4")}
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

export default Forms;