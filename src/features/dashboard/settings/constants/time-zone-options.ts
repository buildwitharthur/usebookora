type TimeZoneOption = {
  /** Fuso IANA guardado no estabelecimento */
  value: string;
  label: string;
};

/** Os 4 fusos oficiais do Brasil, do leste para o oeste */
export const TIME_ZONE_OPTIONS: TimeZoneOption[] = [
  { value: "America/Noronha", label: "Fernando de Noronha (UTC−2)" },
  { value: "America/Sao_Paulo", label: "Brasília (UTC−3)" },
  {
    value: "America/Manaus",
    label: "Amazonas, Mato Grosso, MS, Rondônia e Roraima (UTC−4)",
  },
  { value: "America/Rio_Branco", label: "Acre e oeste do Amazonas (UTC−5)" },
];
