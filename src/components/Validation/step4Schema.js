import * as Yup from 'yup';

const step4Schema = Yup.object().shape({
  problema: Yup.string().required('Por favor, selecione sua resposta.'),
  exortacao: Yup.string().required('Por favor, selecione sua resposta.'),
  discipulo: Yup.string().required('Por favor, selecione sua resposta.'),
  cultosdeoracao: Yup.string().required('Por favor, selecione sua resposta.'),
  participacaocultos: Yup.string().required('Por favor, selecione sua resposta.'),
  habito: Yup.string().required('Por favor, selecione sua resposta.'),
  aconselhamentopastoral: Yup.string().required('Por favor, selecione sua resposta.'),
  desenvolvimento: Yup.string().required('Por favor, selecione sua resposta.')
});

export default step4Schema;
