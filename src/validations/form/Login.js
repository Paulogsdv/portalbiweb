import * as Yup from 'yup';

const schema = Yup.object().shape({
   email: Yup.string()
      .email('Formato errado!')
      .min(1, 'Insira um email válido!')
      .required('Email obrigatório!'),
   senha: Yup.string()
      .min(1, 'A senha deve possuir mais que 1 caracter!')
      .required('Senha obrigatória!'),
});

export default schema;
