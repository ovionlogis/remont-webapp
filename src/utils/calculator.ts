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

export const pluralize = (count: number, [one, few, many]: [string, string, string]): string => {
  const absCount = Math.abs(count) % 100;
  const lastDigit = absCount % 10;

  if (absCount >= 11 && absCount <= 14) {
    return many;
  }

  if (lastDigit === 1) {
    return one;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }

  return many;
};
