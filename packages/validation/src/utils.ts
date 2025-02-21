/** Strip all formatting, leaving only numbers and letters */
export function stripFormatting(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Used to validate Norwegian bank account numbers, organization numbers and national identity numbers.
 * See https://no.wikipedia.org/wiki/MOD11
 */
export function mod11(value: string, weights: number[]): boolean {
  // Since the control digit is a single value, the lengths should be equal
  if (weights.length + 1 !== value.length) {
    return false;
  }

  let sum = 0;
  weights.forEach((weight, index) => {
    sum += weight * Number(value[index]);
  });

  let controlNumber = 11 - (sum % 11);

  if (controlNumber === 11) {
    controlNumber = 0;
  }

  return controlNumber === Number(value[value.length - 1]);
}
