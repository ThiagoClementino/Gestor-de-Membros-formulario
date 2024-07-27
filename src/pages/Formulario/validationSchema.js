import * as yup from 'yup';

// SchemaOne
export const step1Schema = yup.object().shape({
  name: yup.string().required('Campo Obrigatório'),
  mothersname: yup.string().required('Campo Obrigatório'),
  fathersname: yup.string().required('Campo Obrigatório'),
  dateBirth: yup.date()
    .required('A data de nascimento é obrigatória')
    .min(new Date(1900, 0, 1), 'A data de nascimento não pode ser antes de 01/01/1900')
    .max(new Date(), 'Data de nascimento não pode ser maior que a data atual'),
  sex: yup.string().required('Campo Obrigatório'),
  telone: yup.string()
    .required('Telefone é obrigatório')
    .matches(/^\(?\d{2}\)?[\s-]?[9]?\d{4}-?\d{4}$/, 'Telefone inválido')
    .min(10, 'O telefone deve ter no mínimo 10 caracteres')
    .max(15, 'O telefone deve ter no máximo 15 caracteres'),
  teltwo: yup.string()
    .required('Telefone é obrigatório')
    .matches(/^\(?\d{2}\)?[\s-]?[9]?\d{4}-?\d{4}$/, 'Telefone inválido')
    .min(10, 'O telefone deve ter no mínimo 10 caracteres')
    .max(15, 'O telefone deve ter no máximo 15 caracteres'),
  email: yup.string().email().required('Campo Obrigatório'),
  national: yup.string().required('Campo Obrigatório'),
  natural: yup.string().required('Campo Obrigatório'),
  profession: yup.string().required('Campo Obrigatório'),
  companywork: yup.string().required('Campo Obrigatório'),
  education: yup.string().required('Campo Obrigatório'),
  cep: yup.string()
    .matches(/^\d{5}-\d{3}$/, 'CEP inválido')
    .required('Campo Obrigatório'),
  address: yup.string().required('Campo Obrigatório'),
  number: yup.string().required('Campo Obrigatório'),
  complement: yup.string(),
  district: yup.string().required('Campo Obrigatório'),
  city: yup.string().required('Campo Obrigatório'),
  state: yup.string().required('Campo Obrigatório'),
  timeinresidence: yup.string().required('Campo Obrigatório')
});

// SchemaTwo
export const step2Schema = yup.object().shape({
  estadocivil: yup.string().required('Campo Obrigatório'),
  conjuge: yup.string().required('Campo Obrigatório'),
  filhos: yup.string().required('Campo Obrigatório'),
  qtdfilhos: yup.string().required('Campo Obrigatório'),

  nomefilhoum: yup.string().required('Campo Obrigatório'),
  idadefilhoum: yup.number().required('Campo Obrigatório').positive().integer(),
  nomefilhodois: yup.string().required('Campo Obrigatório'),
  idadefilhodois: yup.number().required('Campo Obrigatório').positive().integer(),
  nomefilhotres: yup.string().required('Campo Obrigatório'),
  idadefilhotres: yup.number().required('Campo Obrigatório').positive().integer(),
  nomefilhoquatro: yup.string().required('Campo Obrigatório'),
  idadefilhoquatro: yup.number().required('Campo Obrigatório').positive().integer(),
  jobChurch: yup.string().required('Campo Obrigatório'),
  jobChurchTemp: yup.date().required('Campo Obrigatório'),
  optionprimeirocasamento: yup.string().required('Campo Obrigatório'),
  casamentocristao: yup.string().required('Campo Obrigatório'),
  parceironaigreja: yup.string().required('Campo Obrigatório'),
  justificativa: yup.string().required('Campo Obrigatório')
});

// SchemaThree
export const step3Schema = yup.object().shape({
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
  atividadeanterior: yup.string().required('Campo Obrigatório')
});

// SchemaFour
export const step4Schema = yup.object().shape({
  problema: yup.string().required('Campo Obrigatório'),
  exortacao: yup.string().required('Campo Obrigatório'),
  discipulo: yup.string().required('Campo Obrigatório'),
  cultosdeoracao: yup.string().required('Campo Obrigatório'),
  participacaocultos: yup.string().required('Campo Obrigatório'),
  habito: yup.string().required('Campo Obrigatório'),
  aconselhamentopastoral: yup.string().required('Campo Obrigatório'),
  desenvolvimento: yup.string().required('Campo Obrigatório')
});

// SchemaFive
export const step5Schema = yup.object().shape({
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
  ultimasconsideracoes: yup.string().required('Campo Obrigatório')
});

