export const parseNumber = (value: string): number | null => {
  if (value.trim() === '') {
    return null;
  }

  const parsed = Number(value.replace(',', '.'));

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
};

export const isInRange = (value: number, min: number, max: number): boolean => value >= min && value <= max;

export const formatNumber = (value: number, maximumFractionDigits = 2): string => value.toLocaleString('ru-RU', { maximumFractionDigits });
