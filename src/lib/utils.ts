export const cx = (...values: Array<string | false | undefined>) => values.filter(Boolean).join(' ');

export const currency = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

export const saveLS = <T>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value));
export const loadLS = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
