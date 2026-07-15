function formatMeasurement(value: string): string {
  return value
    .replace(',', '.')
    .replace(/^(\d{0,3})(\.\d{0,2})?.*/, '$1$2');
}

export const formatWeight = (v: string) => formatMeasurement(v);
export const formatHeight = (v: string) => formatMeasurement(v);
