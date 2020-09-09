/* eslint-disable consistent-return, prefer-const,  operator-assignment */
export default function formatDate(time) {
   if (time) {
      let [hora, min, seg] = time;

      if (hora < 10) {
         hora = `0${hora}`;
      }

      if (min < 10) {
         min = `0${min}`;
      }

      if (seg < 10) {
         seg = `0${seg}`;
      }

      if (seg === undefined) {
         return `${hora}:${min}`;
      }

      return `${hora}:${min}:${seg}`;
   }
}
