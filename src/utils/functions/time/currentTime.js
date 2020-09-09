/* eslint-disable consistent-return */
export default function currentTime(hour, min) {
   const time = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

   if (hour != null) {
      const dataAux = new Date();
      dataAux.setHours(time.getHours() + hour);
      return dataAux;
   }

   if (min != null) {
      const dataAux = new Date();
      dataAux.setMinutes(time.getMinutes() + min);
      return dataAux;
   }
}
