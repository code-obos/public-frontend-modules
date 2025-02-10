import type { ValidatorOptions } from './types';
import { stripFormatting } from './utils';

type PostalCodeOptions = ValidatorOptions;

/**
 * Validates that the input value is a Swedish postal (zip) code.
 * @example
 * ```
 * validatePostalCode('00000') // => true
 * ```
 */
export function validatePostalCode(
  value: string,
  options: PostalCodeOptions = {},
): boolean {
  if (options.allowFormatting) {
    value = stripFormatting(value);
  }

  return /^\d{3} ?\d{2}$/.test(value);
}

type PhoneNumberOptions = ValidatorOptions & {
  /**
   * Whether it should be a mobile number
   * @default false
   */
  mobileOnly?: boolean;
};

/**
 * Validates that the input value is a Swedish phone number.
 *
 * Supports mobile only validation.
 * @example
 * ```
 * validatePhoneNumber('00000000') // => true
 * validatePhoneNumber('000000000') // => true
 * validatePhoneNumber('0000000000') // => true
 * validatePhoneNumber('0700000000', { mobileOnly: true }) // => true
 * ```
 */
export function validatePhoneNumber(
  value: string,
  options: PhoneNumberOptions = {},
): boolean {
  if (options.allowFormatting) {
    value = stripFormatting(value);
  }

  if (options.mobileOnly) {
    const isMobileNumber = /^07\d{8}$/.test(value);
    return isMobileNumber;
  }

  const isPhoneNumber = /^0\d{7,9}$/.test(value);

  return isPhoneNumber;
}

type OrganizationNumberOptions = ValidatorOptions;

/**
 * Validates that the input value is a {@link https://www.skatteverket.se/foretagochorganisationer/foretagare/startaochregistrera/organisationsnummer.4.361dc8c15312eff6fd235d1.html Swedish organization number}.
 * @example
 * ```
 * validateOrganizationNumber('000000000') // => true
 * ```
 */
export function validateOrganizationNumber(
  value: string,
  options: OrganizationNumberOptions = {},
): boolean {
  // TODO: Implement proper validation
  if (options.allowFormatting) {
    value = stripFormatting(value);
  }

  return /^\d{10}$/.test(value);
}
