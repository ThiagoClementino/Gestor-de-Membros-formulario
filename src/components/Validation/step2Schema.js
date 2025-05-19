import * as Yup from 'yup';

// Função auxiliar para verificar se é um número válido
const isValidNumber = (value) => {
  if (!value) return false;
  return !isNaN(parseInt(value));
};

const step2Schema = Yup.object().shape({
  estadocivil: Yup.string().required('Por favor, selecione seu estado civil.'),
  
  // Campo cônjuge - obrigatório apenas se casado
  conjuge: Yup.string().when('estadocivil', {
    is: 'Casado',
    then: (schema) => schema.required('Por favor, digite o nome do seu cônjuge.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  filhos: Yup.string().required('Por favor, selecione se possui filhos.'),
  
  // Quantidade de filhos - obrigatório apenas se tem filhos
  qtdfilhos: Yup.string().when('filhos', {
    is: 'Sim',
    then: (schema) => schema.required('Por favor, selecione a quantidade de filhos.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  // Dados do primeiro filho
  nomefilhoum: Yup.string().when(['filhos', 'qtdfilhos'], {
    is: (filhos, qtdfilhos) => {
      return filhos === 'Sim' && isValidNumber(qtdfilhos) && parseInt(qtdfilhos) >= 1 && parseInt(qtdfilhos) <= 4;
    },
    then: (schema) => schema.required('Por favor, digite o nome do primeiro filho.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  idadefilhoum: Yup.string().when(['filhos', 'qtdfilhos'], {
    is: (filhos, qtdfilhos) => {
      return filhos === 'Sim' && isValidNumber(qtdfilhos) && parseInt(qtdfilhos) >= 1 && parseInt(qtdfilhos) <= 4;
    },
    then: (schema) => schema.required('Por favor, digite a idade do primeiro filho.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  // Dados do segundo filho
  nomefilhodois: Yup.string().when(['filhos', 'qtdfilhos'], {
    is: (filhos, qtdfilhos) => {
      return filhos === 'Sim' && isValidNumber(qtdfilhos) && parseInt(qtdfilhos) >= 2 && parseInt(qtdfilhos) <= 4;
    },
    then: (schema) => schema.required('Por favor, digite o nome do segundo filho.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  idadefilhodois: Yup.string().when(['filhos', 'qtdfilhos'], {
    is: (filhos, qtdfilhos) => {
      return filhos === 'Sim' && isValidNumber(qtdfilhos) && parseInt(qtdfilhos) >= 2 && parseInt(qtdfilhos) <= 4;
    },
    then: (schema) => schema.required('Por favor, digite a idade do segundo filho.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  // Dados do terceiro filho
  nomefilhotres: Yup.string().when(['filhos', 'qtdfilhos'], {
    is: (filhos, qtdfilhos) => {
      return filhos === 'Sim' && isValidNumber(qtdfilhos) && parseInt(qtdfilhos) >= 3 && parseInt(qtdfilhos) <= 4;
    },
    then: (schema) => schema.required('Por favor, digite o nome do terceiro filho.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  idadefilhotres: Yup.string().when(['filhos', 'qtdfilhos'], {
    is: (filhos, qtdfilhos) => {
      return filhos === 'Sim' && isValidNumber(qtdfilhos) && parseInt(qtdfilhos) >= 3 && parseInt(qtdfilhos) <= 4;
    },
    then: (schema) => schema.required('Por favor, digite a idade do terceiro filho.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  // Dados do quarto filho
  nomefilhoquatro: Yup.string().when(['filhos', 'qtdfilhos'], {
    is: (filhos, qtdfilhos) => {
      return filhos === 'Sim' && isValidNumber(qtdfilhos) && parseInt(qtdfilhos) >= 4 && parseInt(qtdfilhos) <= 4;
    },
    then: (schema) => schema.required('Por favor, digite o nome do quarto filho.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  idadefilhoquatro: Yup.string().when(['filhos', 'qtdfilhos'], {
    is: (filhos, qtdfilhos) => {
      return filhos === 'Sim' && isValidNumber(qtdfilhos) && parseInt(qtdfilhos) >= 4 && parseInt(qtdfilhos) <= 4;
    },
    then: (schema) => schema.required('Por favor, digite a idade do quarto filho.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  // Campos opcionais
  jobChurch: Yup.string(),
  jobChurchTemp: Yup.string(),
  
  // Campos condicionais para casados
  optionprimeirocasamento: Yup.string().when('estadocivil', {
    is: 'Casado',
    then: (schema) => schema.required('Por favor, selecione se é seu primeiro casamento.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  casamentocristao: Yup.string().when('estadocivil', {
    is: 'Casado',
    then: (schema) => schema.required('Por favor, selecione se casou em cerimônia cristã.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  parceironaigreja: Yup.string().when('estadocivil', {
    is: 'Casado',
    then: (schema) => schema.required('Por favor, selecione se seu cônjuge se tornará membro.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  // Justificativa - obrigatória apenas se parceiro não vai para igreja
  justificativa: Yup.string().when(['estadocivil', 'parceironaigreja'], {
    is: (estadocivil, parceironaigreja) => {
      return estadocivil === 'Casado' && parceironaigreja === 'nao';
    },
    then: (schema) => schema.required('Por favor, justifique sua resposta.'),
    otherwise: (schema) => schema.notRequired()
  })
});

export default step2Schema;
