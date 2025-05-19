import * as Yup from 'yup';

const validationSchema = Yup.object().shape({


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
  