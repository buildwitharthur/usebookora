const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata um valor em centavos como moeda brasileira (ex.: 2990 → "R$ 29,90") */
export const formatCurrency = (cents: number) =>
  currencyFormatter.format(cents / 100);
