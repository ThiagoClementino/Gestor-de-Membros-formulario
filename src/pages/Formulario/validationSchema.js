import * as yup from 'yup';


const secao1 = yup.object().shape({

  name: yup.string().required('Campo Obrigatório'),
  mothersname: yup.string().required('Campo Obrigatório'),
  fathersname: yup.string().required('Campo Obrigatório'),
  dateBirth: yup.date().required('A data de nascimento é obrigatória').min(new Date(1900,0,1), 'A data de nascimento não pode ser antes de 01/01/1900').max(new Date(),'Data de nacimento não pode ser maior que a data atual' ),
  sex: yup.string().required('Campo Obrigatório'),
  telone: yup.string().required.matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Número de telefone inválido'),
  teltwo: yup.string().required.matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Número de telefone inválido'),
  email: yup.string().email().required('Campo Obrigatório'),
  national: yup.string().required('Campo Obrigatório'),
  natural: yup.string().required('Campo Obrigatório'),
  profession: yup.string().required('Campo Obrigatório'),
  companywork: yup.string().required('Campo Obrigatório'),
  education: yup.string().required('Campo Obrigatório'),
  cep: yup.string().matches(/^\d{5}-\d{3}$/).required('Campo Obrigatório'),
  address: yup.string().required('Campo Obrigatório'),
  number: yup.string().required('Campo Obrigatório'),
  complement: yup.string().required('Campo Obrigatório'),
  district: yup.string().required('Campo Obrigatório'),
  city: yup.string().required('Campo Obrigatório'),
  state: yup.string().required('Campo Obrigatório'),
  timeinresidence: yup.string().required('Campo Obrigatório'),


})
  

const secao2 = yup.object().shape({

  estadocivil: yup.string().required('Campo Obrigatório'),
  conjuge: yup.string().required('Campo Obrigatório'),
  filhos: yup.string().required('Campo Obrigatório'),
  qtdfilhos: yup.string().required('Campo Obrigatório'),
  nomefilhoum: yup.string().required('Campo Obrigatório'),
  idadefilhoum: yup.string().required('Campo Obrigatório'),
  nomefilhodois: yup.string().required('Campo Obrigatório'),
  idadefilhodois: yup.string().required('Campo Obrigatório'),
  nomefilhotres: yup.string().required('Campo Obrigatório'),
  idadefilhotres: yup.string().required('Campo Obrigatório'),
  nomefilhoquatro: yup.string().required('Campo Obrigatório'),
  idadefilhoquatro: yup.string().required('Campo Obrigatório'),
  jobChurch: yup.string().required('Campo Obrigatório'),
  jobChurchTemp: yup.string().required('Campo Obrigatório'),
  congregacao: yup.string().required('Campo Obrigatório'),
  optionprimeirocasamento: yup.string().required('Campo Obrigatório'),
  casamentocristao: yup.string().required('Campo Obrigatório'),
  parceironaigreja: yup.string().required('Campo Obrigatório'),
  justificativa: yup.string().required('Campo Obrigatório'),
});
const secao3 = yup.object().shape({
  
  databatismo: yup.date().required('Campo Obrigatório'),
  dataconversao: yup.date().required('Campo Obrigatório'),
  lastchurch: yup.string().required('Campo Obrigatório'),
  motivosaida: yup.string().required('Campo Obrigatório'),
  igrejasquefoimembro: yup.string().required('Campo Obrigatório'),
  dizimista: yup.string().required('Campo Obrigatório'),
  ofertante: yup.string().required('Campo Obrigatório'),
  cargoanterior: yup.string().required('Campo Obrigatório'),
  separadoanterior: yup.string().required('Campo Obrigatório'),
  posicaoanterior: yup.string().required('Campo Obrigatório'),
  atividadeanterior: yup.string().required('Campo Obrigatório'),
});
const secao4 = yup.object().shape({

  problema: yup.string().required('Campo Obrigatório'),
  exortacao: yup.string().required('Campo Obrigatório'),
  discipulo: yup.string().required('Campo Obrigatório'),
  cultosdeoracao: yup.string().required('Campo Obrigatório'),
  participacaocultos: yup.string().required('Campo Obrigatório'),
  habito: yup.string().required('Campo Obrigatório'),
  aconselhamentopastoral: yup.string().required('Campo Obrigatório'),
  desenvolvimento: yup.string().required('Campo Obrigatório')

});
const secao5 = yup.object().shape({
  coniccaodiscipulo: yup.string().required('Campo Obrigatório'),
  definicaoevangelho: yup.string().required('Campo Obrigatório'),
  frutosespirito: yup.string().required('Campo Obrigatório'),
  desenvolvimentodafe: yup.string().required('Campo Obrigatório'),
  pecado: yup.string().required('Campo Obrigatório'),
  conviccaoteologica: yup.string().required('Campo Obrigatório'),
  evangelizar: yup.string().required('Campo Obrigatório'),
  jejuar: yup.string().required('Campo Obrigatório'),
  leiturabiblica: yup.string().required('Campo Obrigatório'),
  livros: yup.string().required('Campo Obrigatório'),
  ultimasconsideracoes: yup.string().required('Campo Obrigatório'),
  cadAtivo: yup.string().rue,
});


const validationSchema = [secao1, secao2, secao3, secao4, secao5];
export default validationSchema