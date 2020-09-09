import * as Yup from 'yup';

const schema = Yup.object().shape({
   dataInicial: Yup.string()
      .min(1, 'Digite uma data válida!')
      .required('Campo obrigatório.'),
});

export default schema;
