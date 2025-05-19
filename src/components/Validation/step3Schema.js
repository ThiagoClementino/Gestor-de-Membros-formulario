import * as Yup from 'yup';

const step3Schema = Yup.object().shape({
  dataconversao: Yup.string().required('Por favor, digite sua data de conversão.'),
  databatismo: Yup.string().required('Por favor, digite sua data de batismo nas águas.'),
  lastchurch: Yup.string().required('Por favor, digite o nome da sua última igreja.'),
  motivosaida: Yup.string().required('Por favor, digite o motivo da sua saída.'),
  igrejasquefoimembro: Yup.string().required('Por favor, liste as igrejas que você foi membro.'),
  dizimista: Yup.string().required('Por favor, selecione se você é dizimista fiel.'),
  ofertante: Yup.string().required('Por favor, selecione se você é ofertante fiel.'),
  cargoanterior: Yup.string().required('Por favor, selecione se exerceu algum cargo de liderança.'),
  separadoanterior: Yup.string().required('Por favor, selecione se foi separado/consagrado.'),
  
  // Campo posição anterior - obrigatório se foi separado ou exerceu cargo
  posicaoanterior: Yup.string().when(['separadoanterior', 'cargoanterior'], {
    is: (separadoanterior, cargoanterior) => separadoanterior === 'sim' || cargoanterior === 'sim',
    then: (schema) => schema.required('Por favor, digite qual era sua posição.'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  // Campo atividade anterior - obrigatório se exerceu cargo
  atividadeanterior: Yup.string().when('cargoanterior', {
    is: 'sim',
    then: (schema) => schema.required('Por favor, descreva suas atividades.'),
    otherwise: (schema) => schema.notRequired()
  })
});

export default step3Schema;
