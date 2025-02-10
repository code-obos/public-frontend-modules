import type { ValidatorOptions } from './types';
import { mod11, stripFormatting } from './utils';

type PostalCodeOptions = ValidatorOptions;

/**
 * Validates that the input value is a Norwegian postal (zip) code.
 * @example
 * ```
 * validatePostalCode('0000') // => true
 * ```
 */
export function validatePostalCode(
  value: string,
  options: PostalCodeOptions = {},
): boolean {
  if (options.allowFormatting) {
    value = stripFormatting(value);
  }

  return /^\d{4}$/.test(value);
}

type PhoneNumberOptions = ValidatorOptions & {
  /**
   * Whether it should be a mobile number
   * @default false
   */
  mobileOnly?: boolean;
};

/**
 * Validates that the input value is a Norwegian phone number.
 *
 * Supports mobile only validation.
 * @example
 * ```
 * validatePhoneNumber('00000000') // => true
 * validatePhoneNumber('90000000', { mobileOnly: true }) // => true
 * ```
 */
export function validatePhoneNumber(
  value: string,
  options: PhoneNumberOptions = {},
): boolean {
  if (options.allowFormatting) {
    value = stripFormatting(value);
  }

  const isPhoneNumber = /^\d{8}$/.test(value);

  if (options.mobileOnly) {
    // Norwegian mobile phone numbers start with 4 or 9
    // See https://nkom.no/telefoni-og-telefonnummer/telefonnummer-og-den-norske-nummerplan/alle-nummerserier-for-norske-telefonnumre
    return isPhoneNumber && ['4', '9'].includes(value.charAt(0));
  }

  return isPhoneNumber;
}

type OrganizationNumberOptions = ValidatorOptions;

/**
 * Validates that the input value is a {@link https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/organisasjonsnummeret/ Norwegian organization number}.
 * @example
 * ```
 * validateOrganizationNumber('000000000') // => true
 * ```
 */
export function validateOrganizationNumber(
  value: string,
  options: PhoneNumberOptions = {},
): boolean {
  if (options.allowFormatting) {
    value = stripFormatting(value);
  }

  /** References:
   * https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/organisasjonsnummeret/
   * https://no.wikipedia.org/wiki/Organisasjonsnummer
   */
  return mod11(value, [3, 2, 7, 6, 5, 4, 3, 2]);
}
