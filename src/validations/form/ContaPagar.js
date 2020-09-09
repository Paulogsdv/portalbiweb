import * as Yup from 'yup';

const schema = Yup.object().shape({
   idConta: Yup.number()
      .min(1, 'Insira um conta bancária válida!')
      .max(200, 'Insira um conta bancária válida!')
      .required('Conta obrigatória.'),
   razao: Yup.string()
      .min(1, 'Insira um razão válida!')
      .max(200, 'Insira um razão válida!')
      .required('Razão obrigatória.'),
   valor: Yup.string()
      .min(1, 'Insira um valor válido!')
      .max(150, 'Insira um valor válido!')
      .required('Valor obrigatório.'),
   dtVcto: Yup.string()
      .min(10, 'Digite uma data válida!')
      .max(10, 'Digite uma data válida!')
      .required('Data obrigatória.'),
});

export default schema;
