import * as Yup from 'yup';

// Função auxiliar para validar data no formato DD/MM/AAAA
const isValidDate = (value) => {
  if (!value) return true;
  
  // Verifica se o formato é DD/MM/AAAA
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(value)) return false;
  
  // Extrai dia, mês e ano
  const parts = value.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  
  // Cria um objeto Date e verifica se é válido
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

// Função auxiliar para validar telefone no formato (XX) XXXXX-XXXX
const isValidPhone = (value) => {
  if (!value) return true;
  
  // Verifica se o formato é (XX) XXXXX-XXXX
  const regex = /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/;
  return regex.test(value);
};

// Função auxiliar para validar CEP no formato XXXXX-XXX
const isValidCep = (value) => {
  if (!value) return true;
  
  // Verifica se o formato é XXXXX-XXX
  const regex = /^[0-9]{5}-[0-9]{3}$/;
  return regex.test(value);
};

const step1Schema = Yup.object().shape({
  name: Yup.string().required('Por favor, digite seu nome completo.'),
  mothersname: Yup.string().required('Por favor, digite o nome da sua mãe.'),
  fathersname: Yup.string().required('Por favor, digite o nome do seu pai.'),
  dateBirth: Yup.string()
    .required('Por favor, digite sua data de nascimento.')
    .test('is-valid-date', 'Data inválida. Use o formato DD/MM/AAAA', isValidDate),
  sex: Yup.string().required('Por favor, selecione seu sexo.'),
  telone: Yup.string()
    .required('Por favor, digite seu telefone principal.')
    .test('is-valid-phone', 'Telefone inválido. Use o formato (XX) XXXXX-XXXX', isValidPhone),
  email: Yup.string().email('Email inválido').required('Por favor, digite seu email.'),
  national: Yup.string().required('Por favor, digite sua nacionalidade.'),
  natural: Yup.string().required('Por favor, digite sua naturalidade.'),
  profession: Yup.string().required('Por favor, digite sua profissão.'),
  companywork: Yup.string().required('Por favor, digite o nome da empresa onde trabalha.'),
  education: Yup.string().required('Por favor, selecione seu grau de escolaridade.'),
  cep: Yup.string()
    .required('Por favor, digite seu CEP.')
    .test('is-valid-cep', 'CEP inválido. Use o formato XXXXX-XXX', isValidCep),
  address: Yup.string().required('Por favor, digite seu endereço.'),
  number: Yup.string().required('Por favor, digite o número do seu endereço.'),
  complement: Yup.string(),
  district: Yup.string().required('Por favor, digite seu bairro.'),
  city: Yup.string().required('Por favor, digite sua cidade.'),
  state: Yup.string().required('Por favor, digite seu estado.'),
  timeinresidence: Yup.string()
});

export default step1Schema;
