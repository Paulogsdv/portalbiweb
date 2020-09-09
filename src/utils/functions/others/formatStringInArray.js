/* eslint-disable consistent-return, prefer-const */
export default function formatStringInArray(stringToSplit, separator) {
   if (stringToSplit) {
      const arrayOfStrings = stringToSplit.split(separator);

      return arrayOfStrings;
   }
}
