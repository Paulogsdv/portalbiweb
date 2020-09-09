import * as Yup from 'yup';

const schema = Yup.object().shape({
   idClientePre: Yup.number().required('Empresa não cadastrada!'),
   limiteCtb: Yup.number().required('Limite não cadastrado!'),
   adm: Yup.number().required('Nivel de usuário não informado!'),
   nome: Yup.string()
      .min(1, 'Insira um nome válido!')
      .required('Nome obrigatório.'),
   email: Yup.string()
      .email('Formato errado!')
      .min(1, 'Insira um email válido!')
      .required('Email obrigatório.'),
   senha: Yup.string()
      .min(1, 'A senha deve possuir mais que 1 caracter!')
      .required('Senha obrigatória!'),
});

export default schema;
