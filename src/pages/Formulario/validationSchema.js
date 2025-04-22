import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Por favor, digite seu nome completo.'),
  mothersname: Yup.string().required('Por favor, digite o nome da sua mãe.'),
  fathersname: Yup.string().required('Por favor, digite o nome do seu pai.'),
  dateBirth: Yup.string().required('Por favor, digite sua data de nascimento.'),
  sex: Yup.string().required('Por favor, selecione seu sexo.'),
  telone: Yup.string().required('Por favor, digite seu telefone principal.'),
  email: Yup.string().email('Por favor, digite um email válido.'),
  national: Yup.string().required('Por favor, digite sua nacionalidade.'),
  natural: Yup.string().required('Por favor, digite sua naturalidade.'),
  profession: Yup.string().required('Por favor, digite sua profissão.'),
  companywork: Yup.string().required('Por favor, digite a empresa onde trabalha.'),
  education: Yup.string().required('Por favor, selecione seu grau de escolaridade.'),
  cep: Yup.string()
    .required('Por favor, digite seu CEP.')
    .matches(/^\d{5}-\d{3}$/, 'Por favor, digite um CEP no formato 00000-000.'),
  address: Yup.string().required('Por favor, digite seu endereço.'),
  number: Yup.string().required('Por favor, digite o número do seu endereço.'),
  complement: Yup.string().notRequired(), // Campo não obrigatório
  district: Yup.string().required('Por favor, digite seu bairro.'),
  city: Yup.string().required('Por favor, digite sua cidade.'),
  state: Yup.string().required('Por favor, selecione seu estado.'),
  timeinresidence: Yup.string().required('Por favor, informe quanto tempo reside no endereço atual.'),
  estadocivil: Yup.string().required('Por favor, selecione seu estado civil.'),
  conjuge: Yup.lazy((value, context) =>
    context.parent.estadocivil === 'Casado'
      ? Yup.string().required('Por favor, digite o nome do seu cônjuge.')
      : Yup.string().notRequired()
  ),
  filhos: Yup.string(),
  qtdfilhos: Yup.lazy((value, context) =>
    context.parent.filhos === 'Sim'
      ? Yup.string().required('Por favor, selecione a quantidade de filhos.')
      : Yup.string().notRequired()
  ),
  nomefilhoum: Yup.lazy((value, context) =>
    context.parent.filhos === 'Sim' && parseInt(context.parent.qtdfilhos, 10) >= 1
      ? Yup.string().required('Por favor, digite o nome do primeiro filho.')
      : Yup.string().notRequired()
  ),
  idadefilhoum: Yup.lazy((value, context) =>
    context.parent.filhos === 'Sim' && parseInt(context.parent.qtdfilhos, 10) >= 1
      ? Yup.string().required('Por favor, digite a idade do primeiro filho.')
      : Yup.string().notRequired()
  ),
  nomefilhodois: Yup.lazy((value, context) =>
    context.parent.filhos === 'Sim' && parseInt(context.parent.qtdfilhos, 10) >= 2
      ? Yup.string().required('Por favor, digite o nome do segundo filho.')
      : Yup.string().notRequired()
  ),
  idadefilhodois: Yup.lazy((value, context) =>
    context.parent.filhos === 'Sim' && parseInt(context.parent.qtdfilhos, 10) >= 2
      ? Yup.string().required('Por favor, digite a idade do segundo filho.')
      : Yup.string().notRequired()
  ),
  nomefilhotres: Yup.lazy((value, context) =>
    context.parent.filhos === 'Sim' && parseInt(context.parent.qtdfilhos, 10) >= 3
      ? Yup.string().required('Por favor, digite o nome do terceiro filho.')
      : Yup.string().notRequired()
  ),
  idadefilhotres: Yup.lazy((value, context) =>
    context.parent.filhos === 'Sim' && parseInt(context.parent.qtdfilhos, 10) >= 3
      ? Yup.string().required('Por favor, digite a idade do terceiro filho.')
      : Yup.string().notRequired()
  ),
  nomefilhoquatro: Yup.lazy((value, context) =>
    context.parent.filhos === 'Sim' && parseInt(context.parent.qtdfilhos, 10) >= 4
      ? Yup.string().required('Por favor, digite o nome do quarto filho.')
      : Yup.string().notRequired()
  ),
  idadefilhoquatro: Yup.lazy((value, context) =>
    context.parent.filhos === 'Sim' && parseInt(context.parent.qtdfilhos, 10) >= 4
      ? Yup.string().required('Por favor, digite a idade do quarto filho.')
      : Yup.string().notRequired()
  ),
  jobChurch: Yup.string().required('Por favor, digite seu cargo no ministério.'),
  jobChurchTemp: Yup.string().required('Por favor, informe há quanto tempo exerce o cargo.'),
  optionprimeirocasamento: Yup.lazy((value, context) =>
    context.parent.estadocivil === 'Casado'
      ? Yup.string().required('Por favor, selecione se é seu primeiro casamento.')
      : Yup.string().notRequired()
  ),
  casamentocristao: Yup.lazy((value, context) =>
    context.parent.estadocivil === 'Casado'
      ? Yup.string().required('Por favor, selecione se casaram em cerimônia cristã.')
      : Yup.string().notRequired()
  ),
  parceironaigreja: Yup.lazy((value, context) =>
    context.parent.estadocivil === 'Casado'
      ? Yup.string().required('Por favor, selecione se seu cônjuge se tornará membro.')
      : Yup.string().notRequired()
  ),
  justificativa: Yup.lazy((value, context) =>
    context.parent.parceironaigreja === 'nao'
      ? Yup.string().required('Por favor, justifique o motivo.')
      : Yup.string().notRequired()
  ),
  dataconversao: Yup.string().required('Por favor, digite sua data de conversão.'),
  databatismo: Yup.string().required('Por favor, digite sua data de batismo nas águas.'),
  lastchurch: Yup.string().required('Por favor, digite o nome da sua última igreja.'),
  motivosaida: Yup.string().required('Por favor, digite o motivo da sua saída.'),
  igrejasquefoimembro: Yup.string().required('Por favor, liste as igrejas que você foi membro.'),
  dizimista: Yup.string().required('Por favor, selecione se você é dizimista fiel.'),
  ofertante: Yup.string().required('Por favor, selecione se você é ofertante fiel.'),
  cargoanterior: Yup.string().required('Por favor, selecione se exerceu algum cargo de liderança.'),
  separadoanterior: Yup.string().required('Por favor, selecione se foi separado/consagrado.'),
  posicaoanterior: Yup.lazy((value, context) =>
    context.parent.separadoanterior === 'sim' || context.parent.cargoanterior === 'sim'
      ? Yup.string().required('Por favor, digite qual era sua posição.')
      : Yup.string().notRequired()
  ),
  atividadeanterior: Yup.lazy((value, context) =>
    context.parent.cargoanterior === 'sim'
      ? Yup.string().required('Por favor, descreva suas atividades.')
      : Yup.string().notRequired()
  ),
  problema: Yup.string().required('Por favor, selecione sua resposta.'),
  exortacao: Yup.string().required('Por favor, selecione sua resposta.'),
  discipulo: Yup.string().required('Por favor, selecione sua resposta.'),
  cultosdeoracao: Yup.string().required('Por favor, selecione sua resposta.'),
  participacaocultos: Yup.string().required('Por favor, selecione sua resposta.'),
  habito: Yup.string().required('Por favor, selecione sua resposta.'),
  aconselhamentopastoral: Yup.string().required('Por favor, selecione sua resposta.'),
  desenvolvimento: Yup.string().required('Por favor, selecione sua resposta.'),
  conviccaodiscipulo: Yup.string().required('Por favor, descreva sua convicção.'),
  definicaoevangelho: Yup.string().required('Por favor, defina o evangelho.'),
  frutosespirito: Yup.string().required('Por favor, liste os frutos do Espírito.'),
  desenvolvimentodafe: Yup.string().required('Por favor, descreva como cuida da sua fé.'),
  pecado: Yup.string().required('Por favor, responda sobre pecados recentes.'),
  conviccaoteologica: Yup.string().required('Por favor, liste suas convicções teológicas.'),
  evangelizar: Yup.string().required('Por favor, selecione sua resposta.'),
  jejuar: Yup.string().required('Por favor, selecione sua resposta.'),
  leiturabiblica: Yup.string().required('Por favor, selecione sua resposta.'),
  livros: Yup.string().required('Por favor, liste os últimos livros lidos.'),
  ultimasconsideracoes: Yup.string().required('Por favor, adicione suas considerações finais.'),
});

export default validationSchema;
  