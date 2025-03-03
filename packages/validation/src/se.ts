import type { ValidatorOptions } from './types';
import { isValidDate, mod10, stripFormatting } from './utils';

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
    // biome-ignore lint/style/noParameterAssign:
    value = stripFormatting(value);
  }

  return /^\d{5}$/.test(value);
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
    // biome-ignore lint/style/noParameterAssign:
    value = stripFormatting(value);
  }

  if (options.mobileOnly) {
    // Mobile numbers start with 07, followed by 0/2/3/6/9 and is 10 digits long
    const isMobileNumber = /^07[02369]\d{7}$/.test(value);
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
  // TODO: Implement checksum validation. For now it only checks the number of digits.
  if (options.allowFormatting) {
    // biome-ignore lint/style/noParameterAssign:
    value = stripFormatting(value);
  }

  return /^\d{10}$/.test(value);
}

type NationalIdentityNumberFormat = 'short' | 'long';
type NationalIdentityNumberOptions = ValidatorOptions & {
  /** Specify this if you want to format to be only long (12 digits) or short (10 digits). By default, both formats are allowed */
  format?: NationalIdentityNumberFormat;
};

// the first two digts are optional, as they're the century in the long format version
const PERSONNUMMER_FORMAT = /^(\d{2}){0,1}(\d{2})(\d{2})(\d{2})([+-]?)(\d{4})$/;

/**
 * Validates that the input value is a Swedish national identity number (personnummer or samordningsnummer).
 *
 * It validates the control digits and checks if the date of birth is valid.
 *
 * @example
 * ```
 * // Short format
 * validatePersonalIdentityNumber('YYMMDDXXXX') // => true
 * validatePersonalIdentityNumber('YYMMDD-XXXX', { allowFormatting: true }) // => true
 *
 * // Long format
 * validatePersonalIdentityNumber('YYYYMMDDXXXX') // => true
 * validatePersonalIdentityNumber('YYYYMMDD-XXXX', { allowFormatting: true }) // => true
 * ```
 */
export function validateNationalIdentityNumber(
  value: string,
  options: NationalIdentityNumberOptions = {},
): boolean {
  const match = PERSONNUMMER_FORMAT.exec(value);

  if (!match) {
    return false;
  }

  const [_, centuryStr, yearStr, monthStr, dayStr, separator, rest] = match;

  if (centuryStr && options.format === 'short') {
    return false;
  }

  if (!centuryStr && options.format === 'long') {
    return false;
  }

  if (separator && !options.allowFormatting) {
    return false;
  }

  // when verifying the value, we must always use the short format, discaring the century
  // if we include the century it would generate a different checksum
  const isValid = mod10(`${yearStr}${monthStr}${dayStr}${rest}`);
  if (!isValid) {
    return false;
  }

  let year = 0;
  switch (true) {
    // if we have the long format version, we already have the full year
    case !!centuryStr:
      year = Number(centuryStr + yearStr);
      break;
    // otherwise, we can use the separator to determine the century of the personnummer
    // if the separator is '+', we know person is over a 100 years old
    // we can then calculate the full year
    case !!separator: {
      const date = new Date();
      const baseYear =
        separator === '+' ? date.getUTCFullYear() - 100 : date.getUTCFullYear();
      year = baseYear - ((baseYear - yearStr) % 100);
      break;
    }
    // if it's the short format, without a separator, we need to special handle the year for the date validation.
    // 1900 isn't a leap year, but 2000 is. Since JS two digits years to the Date constructor is an offset from the year 1900
    // we need to special handle that case. For other cases it doesn't really matter if the year is 1925 or 2025.
    case yearStr === '00':
      year = 2000;
      break;
    // short version without separator
    default:
      year = Number(yearStr);
  }

  const month = Number(monthStr);

  let day = Number(dayStr);
  // for a samordningsnummer the day is increased by 60. Eg the 31st of a month would be 91, or the 3rd would be 63.
  // thus we need to subtract 60 to get the correct day of the month
  if (day > 60) {
    day = day - 60;
  }

  return isValidDate(year, month, day, centuryStr || separator);
}

// just reexport the no method for API feature parity
export { validateObosMembershipNumber } from './no';
