import React from "react";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Forms = () => {
  const dataMatricula = () => {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const [cadMembers, setCadMembers] = useState({
    matricula: uuidv4(),
    datacriacao: dataMatricula(),
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
    Ultimasconsideracoes: "",
  });
  const [exibirfilho, setExibirfilho] = useState(0);
  



  const handleSubmitCamps = (event) => {
    setCadMembers({ ...cadMembers, [event.target.name]: event.target.value });
    if (event.target.name === "qtdfilhos") {
      setExibirfilho(parseInt(event.target.value));
    }
    
  };

  const handleSubmitForm = async (event) => {
    try {
      event.preventDefault();

      const response = await fetch(
        "https://api-gestao-igreja.onrender.com/membros",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(cadMembers),
          mode: "cors",
        }
      );

      const json = await response.json();
      console.log(json);
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }

    setCadMembers("");
    console.log(cadMembers);
    
  };

  const buscaCep = (e) => {
    const cep = e.target.value;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout((async) => {
          setCadMembers({
            ...cadMembers,
            address: data.logradouro,
            district: data.bairro,
            city: data.localidade,
            state: data.uf,
          });
        }, 1000);
      })
      .catch((error) => console.log(error));

    console.log(cadMembers);
  };

  const [exibir, setExibir] = useState("secao1");
  
  const secaotaiva = (secao) => {
    setExibir(secao);
    
    
  };




  return (
    <form onSubmit={handleSubmitForm} >
      {exibir === "secao1" && (
        <Container  style={{ height: '100vh' }} >
          <Row>
          <h3>Dados Pessoais</h3>
          <label className="d-none " >
            <label >
              <input
              
                className="hidden-"
                type="text"
                name="matricula"
                value={cadMembers.matricula}
                onChange={handleSubmitCamps}
                disabled
                
              />
            </label>
            <input
            
              className="hiden"
              type="hiden"
              name="uuid"
              value={cadMembers.datacriacao || ""}
              onChange={handleSubmitCamps}
              disabled
            />
          </label>
       
          <label className="col-md-6">
            <p>Nome Completo</p>
            <input
            className="form-control"
              type="text"
              name="name"
              
              value={cadMembers.name || ""}
              onChange={handleSubmitCamps}
              required
            />
          </label>
       

          <label className="col-md-6">
            <p>Nome da Mãe</p>
            <input
            className="form-control"
              type="text"
              placeholder="Nome da Mãe"
              name="mothersname"
              value={cadMembers.mothersname || ""}
              onChange={handleSubmitCamps}
            />
          </label>
          <label className="col-md-6">
            <p>Nome do Pai</p>
            <input
            className="form-control"
              type="text"
              placeholder="Nome do Pai"
              name="fathersname"
              value={cadMembers.fathersname || ""}
              onChange={handleSubmitCamps}
            />
          </label>

          <label className="col-md-6">
            <p>Data de nascimento</p>
            <input
            className="form-control"
              type="date"
              name="dateBirth"
              value={cadMembers.dateBirth || ""}
              onChange={handleSubmitCamps}
              placeholder="00/00/0000"
            />
          </label>

          <label className="col-md-6">
            <p>Sexo</p>
            <select
               className="form-control"
              name="sex"
              value={cadMembers.sex || ""}
              onChange={handleSubmitCamps}
            >
              <option value="">Escolha</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </label>

          <label className="col-md-6">
            <p>Telefone</p>
            <input
            className="form-control"
           
              type="text"
              mask="(00) 00000-0000"
              placeholder="(00) 00000-0000"
              name="telone"
              value={cadMembers.telone || ""}
              onChange={handleSubmitCamps}
              required
            />
            
          </label>

          <label className="col-md-6">
            <p>Telefone 2</p>
            <input
            className="form-control"
              type="text"
              placeholder="(00) 00000-0000"
              mask="(00) 00000-0000"
              name="teltwo"
              value={cadMembers.teltwo || ""}
              onChange={handleSubmitCamps}
            />
          </label>

          <label className="col-md-6">
            <p>E-mail</p>
            <input
            className="form-control"
              type="email"
              placeholder="email@email.com"
              name="email"
              value={cadMembers.email || ""}
              onChange={handleSubmitCamps}
              required
            />
          </label>

          <label className="col-md-6">
            <p>Nacionalidade</p>
            <input
            className="form-control"
              type="text"
              placeholder="Nacionalidade"
              name="national"
              value={cadMembers.national || ""}
              onChange={handleSubmitCamps}
            />
          </label>

          <label className="col-md-6">
            <p>Naturalidade</p>
            <input
            className="form-control"
              type="text"
              placeholder="Naturalidade"
              name="natural"
              value={cadMembers.natural || ""}
              onChange={handleSubmitCamps}
            />
          </label>
          <label className="col-md-6">
            <p>Profissão</p>
            <input
            className="form-control"
              type="text"
              placeholder=""
              name="profession"
              value={cadMembers.profession || ""}
              onChange={handleSubmitCamps}
            />
          </label>
          <label className="col-md-6">
            <p>Empresa que trabalha </p>
            <input
            className="form-control"
              type="text"
              name="companywork"
              value={cadMembers.companywork || ""}
              onChange={handleSubmitCamps}
            />
          </label>

          <label className="col-md-6">
            <p>Grau de escolaridade</p>
            <select
               className="form-control" aria-label="Default select example"
              name="education"
              value={cadMembers.education || ""}
              onChange={handleSubmitCamps}
            > <option >Escolha</option>
              <option value="Ensino Fundamental">Ensino Fundamental</option>
              <option value="Ensino Medio">Ensino Médio</option>
              <option value="Ensino Superior">Ensino Superior</option>
            </select>
          </label>

          <label className="col-md-6">
            <p>CEP</p>
            <input
            className="form-control"
              mask="00000-000"
              type="text"
              placeholder="CEP"
              name="cep"
              value={cadMembers.cep || ""}
              onChange={handleSubmitCamps}
              onBlur={buscaCep}
            />
          </label>
          <label className="col-md-6">
            <p>Endereço</p>
            <input
            className="form-control"
              type="text"
              name="address"
              value={cadMembers.address || ""}
              onChange={handleSubmitCamps}
            />
          </label>
          <label className="col-md-6">
            <p>Número</p>
            <input
            className="form-control"
              type="text"
              name="number"
              value={cadMembers.number || ""}
              onChange={handleSubmitCamps}
            />
          </label>

          <label className="col-md-6">
            <p>Complemento</p>
            <input
            className="form-control"
              type="text"
              name="complement"
              value={cadMembers.complement || ""}
              onChange={handleSubmitCamps}
            />
          </label>
          <label className="col-md-6">
            <p>Bairro</p>
            <input
            className="form-control"
              type="text"
              placeholder="district"
              name="district"
              value={cadMembers.district || ""}
              onChange={handleSubmitCamps}
            />
          </label>

          <label className="col-md-6">
            <p>Cidade</p>
            <input
            className="form-control"
              type="text"
              name="city"
              value={cadMembers.city || ""}
              onChange={handleSubmitCamps}
            />
          </label>

          <label className="col-md-6">
            <p>Estado</p>
            <input
            className="form-control"
              type="text"
              placeholder="Estado"
              name="state"
              value={cadMembers.state || ""}
              onChange={handleSubmitCamps}
            />
          </label>

          <label className="col-md-6">
            <p>Quanto tempo está no mesmo endereço?</p>
            <input
            className="form-control"
              type="text"
              name="timeinresidence"
              value={cadMembers.timeinresidence || ""}
              onChange={handleSubmitCamps}
            />
          </label>
          <div className="col-xs2">
          <button variant="btn btn prymary mt-3"  size="lg"
            className={`nav-Link ${exibir === "secao1" ? "active" : ""}`}
            onClick={() => secaotaiva("secao2")}
          >
            Avançar
          </button>{' '}
          </div>
          </Row>
        </Container>
      )}
      {exibir === "secao2" && (
        <Container style={{ height: '100vh' }}>
          <Row>

            <h3 className="text-center">Relacionamento</h3>
            <label className="col-md-6">
              <p>Estado Civil</p>
              <select
                 className="form-control"
                name="estadocivil"
                id="estadocivil"
                
                value={cadMembers.estadocivil || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="Solteiro">Solteiro</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divocriado</option>
              </select>
            </label>
            <label className="col-md-6">
              <p>Nome do Conjugê</p>
              <input
              className="form-control"
                type="text"
                name="conjuge"
                id="conjuge"
                placeholder="Digite o nome do conjugê"
                value={cadMembers.conjuge || ""}
                onChange={handleSubmitCamps}
              />
            </label>
            <label className="col-md-6">
              <p>Possui Filhos</p>
              <select
                 className="form-control"
                name="filhos"
                id="filhos"
                
                value={cadMembers.filhos || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="Sim">Sim</option>
                <option value="Nao">Não</option>
              </select>
              </label>


            <label className="col-md-6">
              <p>Quantidade de filhos</p>
              <select
                 className="form-control"
                
                name="qtdfilhos"
                id="qtdfilhos"
                value={cadMembers.qtdfilhos || ""}
                onChange={handleSubmitCamps}
              >
                <option value="0">Selecione</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="acima de quatro">Acima de quatro</option>
                </select>
            </label>
            {exibirfilho > 0 && (
            <Container fluid className=" mt-4 mb-4">
              <h5>Dados do filhos</h5>
              
               
              
              {exibirfilho > 0 && exibirfilho <= 4  && (<Row>
                <h6>Dados do primeiro Fiho</h6>
                <Col xs={9}>
                <input
                className="form-control" 
                  type="text"
                  name="nomefilhoum"
                  id="nomefilhoum"
                  placeholder="Digite o nome dos filhos"
                  value={cadMembers.nomefilhoum || ""}
                  onChange={handleSubmitCamps}
                />
                </Col>
                <Col xs={3}>
                <input
                className="form-control col"
                  type="number"
                  name="idadefilhoum"
                  id="idadefilhoum"
                  placeholder="idade"
                  value={cadMembers.idadefilhoum || ""}
                  onChange={handleSubmitCamps}
                />
                </Col>
                </Row> )}
              
                {exibirfilho > 1 && exibirfilho <= 4 && (
              <Row>
                <h6>Dados do segundo Fiho</h6>
                <Col xs={9}>
                <input
                className="form-control"
                  type="text"
                  name="nomefilhodois"
                  id="nomefilhodois"
                  placeholder="Digite o nome dos filhos"
                  value={cadMembers.nomefilhodois || ""}
                  onChange={handleSubmitCamps}
                />
                </Col>
                <Col xs={3}>
                <input
                className="form-control"
                  type="number"
                  name="idadefilhodois"
                  id="idadefilhodois"
                  value={cadMembers.idadefilhodois || ""}
                  onChange={handleSubmitCamps}
                  placeholder="idade"
                />
                </Col>
              </Row>
                    )}
              {exibirfilho > 2 && exibirfilho <= 4 && (  
              <Row >
              <h6>Dados do terceiro Fiho</h6>
              <Col xs={9}>
                <input
                className="form-control col" 
                  type="text"
                  name="nomefilhotres"
                  id="nomefilhotres"
                  placeholder="Digite o nome dos filhos"
                  value={cadMembers.nomefilhotres || ""}
                  onChange={handleSubmitCamps}
                />
                </Col>
                <Col xs={3}>
                <input
                className="form-control col" 
                  type="number"
                  name="idadefilhotres"
                  id="idadefilhotres"
                  value={cadMembers.idadefilhotres || ""}
                  onChange={handleSubmitCamps}
                  placeholder="idade"
                />
                </Col>
              </Row>)}
              {exibirfilho > 3 && (
              <Row >
              <h6>Dados do quarto Fiho</h6>
                <Col xs={9}>
                <input
                className="form-control col"  
                  type="text"
                  name="nomefilhoquatro"
                  id="nomefilhoquatro"
                  placeholder="Digite o nome dos filhos"
                  value={cadMembers.nomefilhoquatro || ""}
                  onChange={handleSubmitCamps}
                />
                </Col>
                <Col xs={3}>                
                <input
                className="form-control col"  
                  type="number"
                  name="idadefilhoquatro"
                  id="idadefilhoquatro"
                  value={cadMembers.idadefilhoquatro || ""}
                  onChange={handleSubmitCamps}
                  placeholder="idade"
                />
                </Col>
              </Row>)}
            </Container>)}

              <label className="col-md-6">
                <p>Qual cargo exerce no ministério</p>
                <input
                className="form-control"
                  type="text"
                  placeholder="Cargo"
                  name="jobChurch"
                  value={cadMembers.jobChurch || ""}
                  onChange={handleSubmitCamps}
                />
              </label>
              <label className="col-md-6">
                <p>Exerce o cargo a quanto tempo?</p>
                <input
                className="form-control"
                  type="number"
                  placeholder="Tempo de Cargo"
                  name="jobChurchTemp"
                  value={cadMembers.jobChurchTemp || ""}
                  onChange={handleSubmitCamps}
                />
              </label>
            <label className="col-md-6">
              <p>Qual congregação você pertence?</p>
              <select
                 className="form-control"
                name="congregacao"
                id="congregacao"
                value={cadMembers.congregacao || ""}
                onChange={handleSubmitCamps}
              >
                <option value="105">105</option>
                <option value="110">110</option>
                <option value="qnq">Qnq</option>
                <option value="recanto">Recanto</option>
                <option value="sede">Sede</option>
              </select>
              </label>

            <label className="col-md-6">
              <p>Primeiro Casamento?</p>
              <select
                 className="form-control"
                name="optionprimeirocasamento"
                id="optionprimeirocasamento"
                value={cadMembers.optionprimeirocasamento || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </label>
            <label className="col-md-6">
              <p>Casaram-se em cerimônia cristã?</p>
              <select
                 className="form-control"
                name="casamentocristao"
                id="casamentocristao"
                value={cadMembers.casamentocristao || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </label>
            <label className="col-md-6">
              <p>
                Nesse momento, seu cônjuge se tornará membro junto com você?
              </p>
              <select
                 className="form-control"
                name="parceironaigreja"
                id="parceironaigreja"
                value={cadMembers.parceironaigreja || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </label>
            <label className="col-md">
              <p>Se não, justificar motivo</p>
              
              <textarea 
              className="form-control" 
                name="justificativa"
                id="justificativa"
                cols="48"
                rows="5"
                value={cadMembers.justificativa || ""}
                onChange={handleSubmitCamps}
              >
                </textarea>
            </label>
      
          <Row>
            <Col className="col bd-highlight">
          <button variant="btn btn prymary mt-3" size="lg"
            className={`nav-Link ${exibir === "secao2" ? "active" : ""}`}
            onClick={() => secaotaiva("secao1")}
          >
            Voltar
          </button>
          </Col>
          <Col className="col d-flex justify-content-end">
          <button variant="btn btn prymary mt-3" size="lg"
            className={`nav-Link ${exibir === "secao2" ? "active" : ""}`}
            onClick={() => secaotaiva("secao3")}
          >
            Avançar
          </button>
          </Col>
          </Row>
        </Row>
        </Container>
      )}
      {exibir === "secao3" && (
          <Container >
        <Row >
            <h3 className="text-center">Histórico Cristão</h3>
            <label className="col-md-6">
              <p>Qual a foi a data de conversão</p>
              <input
              className="form-control"
                type="date"
                name="dataconversao"
                id="dataconversao"
                value={cadMembers.dataconversao || ""}
                onChange={handleSubmitCamps}
              />
            </label>
            <label className="col-md-6">
              <p>Qual foi sua data de batismo nas águas</p>
              <input
              className="form-control"
                type="date"
                name="databatismo"
                id="databatismo"
                value={cadMembers.databatismo || ""}
                onChange={handleSubmitCamps}
              />
            </label>

            <label className="col-md-6">
              <p>Qual foi a sua última igreja?</p>
              <input
              className="form-control"
                type="text"
                name="lastchurch"
                id="lastchurch"
                value={cadMembers.lastchurch || ""}
                onChange={handleSubmitCamps}
              />
             </label>
            <label className="col-md-6">
              <p>Por qual motivo você saiu dela?</p>
              <input
              className="form-control"
                type="text"
                name="motivosaida"
                id="motivosaida"
                value={cadMembers.motivosaida || ""}
                onChange={handleSubmitCamps}
              />
             </label>
            <label className="col-md-12">
              <p>
                Quais foram as igrejas que você foi membro desde a sua
                conversão?
              </p>
              <textarea
                className="form-control" 
                name="igrejasquefoimembro"
                id="igrejasquefoimembro"
                cols="80"
                rows="2"
                value={cadMembers.igrejasquefoimembro || ""}
                onChange={handleSubmitCamps}>

                </textarea>
            
             </label>
            <label className="col-md-6">
              <p>Você é dizimista fiel? </p>
              <select
                 className="form-control"
                name="dizimista"
                id="dizimista"
                value={cadMembers.dizimista || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>Você é ofertante fiel? </p>
              <select
                 className="form-control"
                name="ofertante"
                id="ofertante"
                value={cadMembers.ofertante || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>
                Você exerceu algum cargo de liderança nas igrejas que passou?{" "}
              </p>
              <select
                 className="form-control"
                name="cargoanterior"
                id="cargoanterior"
                value={cadMembers.cargoanterior || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>Você foi separado/consagrado a algum cargo ministerial? </p>
              <select
                 className="form-control"
                name="separadoanterior"
                id="separadoanterior"
                value={cadMembers.separadoanterior || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>Qual era a sua posição</p>
              <input
              className="form-control"
                type="text"
                name="posicaoanterior"
                id="posicaoanterior"
                value={cadMembers.posicaoanterior || ""}
                onChange={handleSubmitCamps}
              />
             </label>
            <label className="col-md-6">
              <p>Quais eram as suas atividades?</p>
              <input
              className="form-control"
                type="text"
                name="atividadeanterior"
                id="atividadeanterior"
                value={cadMembers.atividadeanterior || ""}
                onChange={handleSubmitCamps}
              />
             </label>
         
             <Row>
            <Col className="col bd-highlight">
          <button variant="btn btn prymary mt-3" size="lg"
            className={`nav-Link ${exibir === "secao3" ? "active" : ""}`}
            onClick={() => secaotaiva("secao2")}
          >
            Voltar
          </button>
          </Col>
          <Col className="col d-flex justify-content-end">
          <button variant="btn btn prymary mt-3" size="lg"
            className={`nav-Link ${exibir === "secao3" ? "active" : ""}`}
            onClick={() => secaotaiva("secao4")}
          >
            Avançar
          </button>
          </Col>
          </Row>
        </Row>
        </Container>
      )}
      {exibir === "secao4" && (
        <Container >
            <Row >
            
              <h3 className="text-center" >Histórico Congracional</h3>
            
            <label className="col-md-6">
              <p>Tem algum problema com liderança, hierarquia e pastoreio?</p>
              <select
                 className="form-control"
                name="problema"
                id="problema"
                value={cadMembers.problema || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>
              Há algum problema em ser corrigido quando a conduta estiver fora dos padrões bíblicos?
              </p>
              <select
                 className="form-control"
                name="exortacao"
                id="exortacao"
                value={cadMembers.exortacao || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>
                Você se considera um discípulo de Jesus com coração
                pastoreável/ensinável?
              </p>
              <select
                 className="form-control"
                name="discipulo"
                id="discipulo"
                value={cadMembers.discipulo || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>
                Tem o hábito de participar de cultos de estudo bíblico e EBDs?
              </p>
              <select
                 className="form-control"
                name="participacaocultos"
                id="participacaocultos"
                value={cadMembers.participacaocultos || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>
                Costuma informar seus pastores sobre ausências na adoração
                coletiva?
              </p>


<textarea 

></textarea>              <textarea
               className="form-control" as="textarea"
               name="habito"
               id="habito"
               cols="45"
               rows="1"
               value={cadMembers.habito || ""}
               onChange={handleSubmitCamps}></textarea>
            
             </label>
            <label className="col-md-6">
              <p>Tem o hábito de participar de cultos de oração?</p>
              <select
                 className="form-control"
                name="cultosdeoracao"
                id="cultosdeoracao"
                value={cadMembers.cultosdeoracao || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>Tem o hábito de buscar aconselhamento pastoral?</p>
              <select
                 className="form-control"
                name="aconselhamentopastoral"
                id="aconselhamentopastoral"
                value={cadMembers.aconselhamentopastoral || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>
              Valoriza o desenvolvimento da vida em comunidade, congregar e servir uns aos outros?
              </p>
              <select
                 className="form-control"
                name="desenvolvimento"
                id="desenvolvimento"
                value={cadMembers.desenvolvimento || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
             <Col className="col d-flex justify-content-start">
          <button  variant="btn btn prymary mt-3" size="lg"
            className={`nav-Link ${exibir === "secao4" ? "active" : ""}`}
            onClick={() => secaotaiva("secao3")}
            >
            Voltar
          </button>
          </Col>
          <Col className="col d-flex justify-content-end">
          <button variant="btn btn prymary mt-3" size="lg"
            className={`nav-Link ${exibir === "secao4" ? "active" : ""}`}
            onClick={() => secaotaiva("secao5")}
            >
            Avançar
          </button>
          </Col>
        </Row>
            </Container>
      )}
      {exibir === "secao5" && (
        <Container>
          <Row>
            <h3 className="text-center">Convicções</h3>
            <label className="col-md-6">
              <p>
                O que te faz convicto de que você é um verdadeiro discípulo de
                Jesus?
              </p>

              <textarea 
              
              ></textarea>
              <textarea 
              className="form-control" as="textarea"
              name="conviccaodiscipulo"
              id="conviccaodiscipulo"
              cols="85"
              rows="3"
              value={cadMembers.conviccaodiscipulo}
              onChange={handleSubmitCamps}
              ></textarea>
             
             </label>
            <label className="col-md-6">
              <p>C
                
                <textarea 
                
                ></textarea>omo você define o evangelho?</p>
              <textarea
              className="form-control" as="textarea"
              name="definicaoevangelho"
              id="definicaoevangelho"
              cols="85"
              rows="3"
              value={cadMembers.definicaoevangelho}
              onChange={handleSubmitCamps}
              >

              

              </textarea>
            
             </label>
            <label className="col-md-6">
              <p>
                Quais frutos do Espírito que podem ser claramente percebidos na
                vida?
              </p>

              <textarea 
              
              ></textarea>
              <textarea 
              className="form-control" as="textarea"
                name="frutosespirito"
                id="frutosespirito"
                cols="85"
                rows="3"
                value={cadMembers.frutosespirito}
                onChange={handleSubmitCamps}


              ></textarea>
              
          
             </label>
            <label className="col-md-6">
              <p>
                Como cuida do desenvolvimento e sua fé e da sua comunhão com
                Deus?
              </p>

              <textarea 
              
              ></textarea>
              <textarea 
              className="form-control" as="textarea"
                name="desenvolvimentodafe"
                id="desenvolvimentodafer"
                cols="85"
                rows="3"
                value={cadMembers.desenvolvimentodafe}
                onChange={handleSubmitCamps}       
              
              >



              </textarea>
             
             </label>
            <label className="col-md-6">
              <p>
                Existe algum pecado contra qual você tenha lutado nos últimos
                anos?
              </p>

              <textarea 
              className="form-control" as="textarea"
                name="pecado"
                id="pecado"
                cols="85"
                rows="3"
                value={cadMembers.pecado}
                onChange={handleSubmitCamps}
              
              ></textarea>
         
             </label>
            <label className="col-md-6">
              <p>Você tem convicções teológicas? Quais seriam?</p>
                
                <textarea 
              className="form-control" as="textarea"
                name="conviccaoteologica"
                id="conviccaoteologica"
                cols="85"
                rows="3"
                value={cadMembers.conviccaoteologica}
                onChange={handleSubmitCamps}
                
                ></textarea>
            
             </label>
            <label className="col-md-6">
              <p>Você tem o hábito de evangelizar?</p>
              <select
                 className="form-control"
                name="evangelizar"
                id="evangelizar"
                value={cadMembers.evangelizar || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>Você tem o hábito de jejuar?</p>
              <select
                 className="form-control"
                name="jejuar"
                id="jejuar"
                value={cadMembers.jejuar || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>Você já leu a bíblia toda alguma vez?</p>
              <select
                 className="form-control"
                name="leiturabiblica"
                id="leiturabiblica"
                value={cadMembers.leiturabiblica || ""}
                onChange={handleSubmitCamps}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
             </label>
            <label className="col-md-6">
              <p>
                Quais os últimos 3 livros que você leu que edificaram a sua fé?
              </p>
              <input
              className="form-control"
                type="text"
                name="livros"
                id="livros"
                value={cadMembers.livros}
                onChange={handleSubmitCamps}
              />
             </label>
            <label className="col-md-12">
              <p>Tem alguma coisa a mais que você queria nos 
                
                <textarea 
              className="form-control" as="textarea"
                name="ultimasconsideracoes"
                id="ultimasconsideracoes"
                cols="100"
                rows="5"
                value={cadMembers.ultimasconsideracoes}
                onChange={handleSubmitCamps}
                
                ></textarea>contar?</p>
          
             </label>
          </Row>
          <Row>
          <Col className="col bd-highlight">
          <button variant="btn btn prymary mt-3" size="lg"
            className={`nav-Link ${exibir === "secao5" ? "active" : ""}`}
            onClick={() => secaotaiva("secao4")}
          >
            Voltar
          </button>
          </Col>
          <Col className="col d-flex justify-content-end">
          <button  type="submit" variant="btn btn prymary mt-3" size="lg">Enviar</button>
          </Col>
          </Row>
        </Container>
      )}
    </form>
  );
};

export default Forms;
