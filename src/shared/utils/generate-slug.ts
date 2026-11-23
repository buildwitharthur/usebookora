import slugify from "slugify";

/** Gera o slug público a partir de um texto (ex.: "Barbearia São João" → "barbearia-sao-joao") */
export const generateSlug = (value: string) =>
  slugify(value, { lower: true, strict: true, locale: "pt", trim: true });
