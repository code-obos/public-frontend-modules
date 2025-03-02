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
type NationalIdenityNumberOptions = ValidatorOptions & {
  /** By default, both formats are allowed */
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
 * // Personnummer
 * validatePersonalIdentityNumber('21075417753') // => true
 *
 * // Samordningsnummer
 * validatePersonalIdentityNumber('53097248016') // => true
 * ```
 */
export function validateNationalIdentityNumber(
  value: string,
  options: NationalIdenityNumberOptions = {},
): boolean {
  const match = PERSONNUMMER_FORMAT.exec(value);

  if (!match) {
    return false;
  }

  const [_, century, year, month, day, separator, rest] = match;

  if (century && options.format === 'short') {
    return false;
  }

  if (separator && !options.allowFormatting) {
    return false;
  }

  // when verifying the value, we must always use the short format, discaring the century
  // if included it would generate a different checksum
  const isValid = mod10(`${year}${month}${day}${rest}`);
  if (!isValid) {
    return false;
  }

  // // this allows us to handle both YYYYMMDD and YYMMDD when extracting the date
  // const offset = isLongFormat ? 2 : 0;
  // // copy/inspiration from NAV https://github.com/navikt/fnrvalidator/blob/77e57f0bc8e3570ddc2f0a94558c58d0f7259fe0/src/validator.ts#L108
  // let year = Number(value.substring(0, 2 + offset));
  // const month = Number(value.substring(2 + offset, 4 + offset));
  // let day = Number(value.substring(4 + offset, 6 + offset));
  //

  const month2 = Number(month);
  let day2 = Number(day);
  let year2 = Number(century ? century + year : year);
  // for a samordningsnummer the day is increased by 60. Eg the 31st of a month would be 91, or the 3rd would be 63.
  // thus we need to subtract 60 to get the correct day of the month
  if (day2 > 60) {
    day2 = day2 - 60;
  }

  // 1900 isn't a leap year, but 2000 is. Since JS two digits years to the Date constructor is an offset from the year 1900
  // we need to special handle that case. For other cases it doesn't really matter if the year is 1925 or 2025.
  if (!separator && !century && year === '00') {
    year2 = 2000;
  } else if (century) {
    year2 = Number(century + year);
  }

  return isValidDate(year2, month2, day2);
}

// just reexport the no method for API feature parity
export { validateObosMembershipNumber } from './no';
