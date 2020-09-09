import * as Yup from 'yup';

const schema = Yup.object().shape({
   segmento: Yup.string()
      .min(1, 'Insira uma segmento válido!')
      .required('Segmento obrigatória.'),
   titulo: Yup.string().required('Titulo obrigatório.'),
   conteudo: Yup.string().required('Conteúdo obrigatório.'),
});

export default schema;
