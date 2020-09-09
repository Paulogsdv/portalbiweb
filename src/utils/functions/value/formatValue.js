export default function FormatValue(value) {
   return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
   }).format(value);
}
