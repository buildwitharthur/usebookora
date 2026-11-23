/**
 * Lê campos do FormData como texto, antes da validação.
 * Campo ausente ou arquivo vira "", para o zod devolver a mensagem do campo.
 *
 * @example getFormValues(formData, ["name", "price"]) // { name: string; price: string }
 */
export const getFormValues = <const K extends string>(
  formData: FormData,
  keys: readonly K[],
) =>
  Object.fromEntries(
    keys.map((key) => {
      const value = formData.get(key);
      return [key, typeof value === "string" ? value : ""];
    }),
  ) as Record<K, string>;
