import * as Yup from 'yup';

const step5Schema = Yup.object().shape({
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
  ultimasconsideracoes: Yup.string().required('Por favor, adicione suas considerações finais.')
});

export default step5Schema;
