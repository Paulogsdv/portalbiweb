export default function MaskDate(date) {
   if (date) {
      const maskDate = [
         date
            .getUTCDate()
            .toString()
            .padStart(2, '0'),
         (date.getUTCMonth() + 1).toString().padStart(2, '0'),
         date.getFullYear(),
      ].join('/');

      return maskDate;
   }
}
