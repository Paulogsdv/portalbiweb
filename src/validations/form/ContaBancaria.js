import * as Yup from 'yup';

const schema = Yup.object().shape({
   cor: Yup.string()
      .min(1, 'Insira uma cor válida!')
      .required('Cor obrigatória.'),
   nome: Yup.string()
      .min(1, 'Insira um nome válido!')
      .max(60, 'Insira um nome válido!')
      .required('Nome obrigatório.'),
});

export default schema;
