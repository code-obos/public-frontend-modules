import type { ValidatorOptions } from './types';
import { isValidDate, mod11, stripFormatting } from './utils';

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
    // biome-ignore lint/style/noParameterAssign:
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
    // biome-ignore lint/style/noParameterAssign:
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
    // biome-ignore lint/style/noParameterAssign:
    value = stripFormatting(value);
  }

  /** References:
   * https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/organisasjonsnummeret/
   * https://no.wikipedia.org/wiki/Organisasjonsnummer
   */
  return mod11(value, [3, 2, 7, 6, 5, 4, 3, 2]);
}

/**
 * Validates that the input value is an OBOS membership number.
 * @example
 * ```
 * validateObosMembershipNumber('0000000') // => true
 * ```
 */
export function validateObosMembershipNumber(
  value: string,
  options: PostalCodeOptions = {},
): boolean {
  if (options.allowFormatting) {
    // biome-ignore lint/style/noParameterAssign:
    value = stripFormatting(value);
  }

  return /^\d{7}$/.test(value);
}

type NationalIdentityNumberOptions = ValidatorOptions;

/**
 * Validates that the input value is a Norwegian national identity number (fødselsnummer or d-nummer).
 *
 * It validates the control digits and checks if the date of birth is valid.
 *
 * @example
 * ```
 * validatePersonalIdentityNumber('DDMMYYXXXXX') // => true
 * ```
 */
export function validateNationalIdentityNumber(
  value: string,
  options: NationalIdentityNumberOptions = {},
): boolean {
  if (options.allowFormatting) {
    // biome-ignore lint/style/noParameterAssign:
    value = stripFormatting(value);
  }

  // Norwegian national identity numbers use mod 11 with two control digits.
  // The first one is calculated for the first 10d digits
  // while the last one uses all 11 digits
  const valueForControlDigit1 = value.slice(0, -1);
  const controlDigit1 = mod11(
    valueForControlDigit1,
    [3, 7, 6, 1, 8, 9, 4, 5, 2],
  );

  const controlDigit2 = mod11(value, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]);

  if (!controlDigit1 || !controlDigit2) {
    return false;
  }

  // copy/inspiration from NAV https://github.com/navikt/fnrvalidator/blob/77e57f0bc8e3570ddc2f0a94558c58d0f7259fe0/src/validator.ts#L108
  let day = Number(value.substring(0, 2));
  const month = Number(value.substring(2, 4));
  let year = Number(value.substring(4, 6));

  // 1900 isn't a leap year, but 2000 is. Since JS two digits years to the Date constructor is an offset from the year 1900
  // we need to special handle that case. For other cases it doesn't really matter if the year is 1925 or 2025.
  if (year === 0) {
    year = 2000;
  }

  // for a d-number the day is increased by 40. Eg the 31st of a month would be 71, or the 3rd would be 43.
  // thus we need to subtract 40 to get the correct day of the month
  if (day > 40) {
    day = day - 40;
  }

  return isValidDate(year, month, day);
}
