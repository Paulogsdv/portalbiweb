import * as Yup from 'yup';

const schema = Yup.object().shape({
   inadimplenciaLimite: Yup.number()
      .max(100, 'Valor máximo até 100!')
      .notRequired('vakirs'),
});

export default schema;
