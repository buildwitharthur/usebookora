/** Centavos para o valor do campo de preço (ex.: 4500 → "45,00") */
export const formatPriceInput = (cents: number) =>
  (cents / 100).toFixed(2).replace(".", ",");
