/**
 * Validates the input value as a valid Swedish postal (zip) code.
 * Valid format is either `00 000` or `00000`.
 */
export function postalCodeValidator(value: string): boolean {
  return /^\d{3} ?\d{2}$/.test(value);
}
