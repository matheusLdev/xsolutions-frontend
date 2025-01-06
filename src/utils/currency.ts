export const truncatedValue = (value: number): number => {
  return Math.floor(value * 100) / 100;
};

export const formatValue = (value: number | undefined): string => {
  if (value === undefined || value === null) return '0,00';
  return 'R$ ' + truncatedValue(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
