export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fa-IR').format(amount);
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

export const toPersianNumber = (n: number | string) => new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(Number(n));

/**
 * Converts Persian digits in a string to English digits.
 * @param input The string potentially containing Persian digits.
 * @returns The string with all Persian digits converted to English.
 */
export const convertPersianToEnglishDigits = (input: string): string => {
  if (!input) return '';
  return input.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
};
