/* eslint-disable consistent-return, prefer-const */
export default function formatDate(data) {
   if (data) {
      let [ano, mes, dia] = data;

      if (mes < 10) {
         mes = `0${mes}`;
      }

      if (dia < 10) {
         dia = `0${dia}`;
      }

      return `${dia}/${mes}/${ano}`;
   }
}
