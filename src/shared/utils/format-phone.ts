/** Dígitos do telefone para exibição (ex.: "11912345678" → "(11) 91234-5678") */
export const formatPhone = (digits: string) => {
  const match = digits.match(/^(\d{2})(\d{4,5})(\d{4})$/);

  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : digits;
};
