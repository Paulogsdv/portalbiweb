/* eslint-disable no-console */
export default function(params, value, reverseYear, options) {
   const data = new Date();

   let dia = data.getDate(); // 1-31
   let mes = data.getMonth(); // 0-11 (zero=janeiro)
   let ano = data.getFullYear(); // 4 dígitos

   if (params === 'minusDays') {
      const dataAux = new Date(data.getTime() - value * 24 * 60 * 60 * 1000);

      dia = dataAux.getDate();
      mes = dataAux.getMonth();
      ano = dataAux.getFullYear();
   } else if (params === 'plusDays') {
      const dataAux = new Date(data.getTime() + value * 24 * 60 * 60 * 1000);

      dia = dataAux.getDate();
      mes = dataAux.getMonth();
      ano = dataAux.getFullYear();
   } else if (params === 'minusMonth') {
      mes = data.getMonth() - value;
   } else if (params === 'plusMonth') {
      mes = data.getMonth() + value;
   } else if (params === 'minusYear') {
      ano = data.getFullYear() - value;
   } else if (params === 'plusYear') {
      ano = data.getFullYear() + value;
   }

   if (options === 'firstDay') {
      dia = 1;
   }

   if (options === 'lastDay') {
      const lastDay = new Date(data.getFullYear(), data.getMonth() + 1, 0);

      dia = lastDay.getDate();
   }

   if (mes < 10) {
      if (mes + 1 >= 10) {
         mes += 1;
      } else {
         mes = `0${mes + 1}`;
      }
   }

   if (dia < 10) {
      dia = `0${dia}`;
   }

   if (reverseYear) {
      return `${ano}/${mes}/${dia}`;
   }

   return `${dia}/${mes}/${ano}`;
}
