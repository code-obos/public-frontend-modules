/**
 * Validates the input value as a valid Norwegian postal (zip) code.
 * Valid format is `0000`.
 */
export function postalCodeValidator(value: string): boolean {
  return /^\d{4}$/.test(value);
}
