export default function toCurrency(number: number, currency = "$"): string {
  return `${currency}${number.toFixed(2)}`;
}
