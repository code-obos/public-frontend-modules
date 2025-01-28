import {
  formatObosMembershipNumber as _formatObosMembershipNumber,
  formatOrganizationNumber as formatOrganizationNumberNo,
  formatPhoneNumber as formatPhoneNumberNo,
  formatPostalCode as formatPostalCodeNo,
} from './no';
import {
  formatOrganizationNumber as formatOrganizationNumberSe,
  formatPhoneNumber as formatPhoneNumberSe,
  formatPostalCode as formatPostalCodeSe,
} from './se';

export type Locale = 'no' | 'se';

type Options = {
  locale: Locale;
};

/**
 * Format a phone number
 * @example
 * ```
 * formatPhoneNumber('00000000', { locale: 'no' }) // => '00 00 00 00'
 * formatPhoneNumber('07012345678', { locale: 'se' }) // => '070-123 45 678'
 * ```
 */
export function formatPhoneNumber(input: string, options: Options): string {
  return options.locale === 'no'
    ? formatPhoneNumberNo(input)
    : formatPhoneNumberSe(input);
}

/**
 * Format an organization number
 * @example
 * ```
 * formatOrganizationNumber('000000000', { locale: 'no' }) // => '000 000 000'
 * formatOrganizationNumber('0000000000', { locale: 'se' }) // => '000000-0000'
 * ```
 */
export function formatOrganizationNumber(
  input: string,
  options: Options,
): string {
  return options.locale === 'no'
    ? formatOrganizationNumberNo(input)
    : formatOrganizationNumberSe(input);
}

/**
 * Format a postal code
 * @example
 * ```
 * formatPostalCode('0000', { locale: 'no' }) // => '0000'
 * formatPostalCode('00000', { locale: 'se' }) // => '000 00'
 * ```
 */
export function formatPostalCode(input: string, options: Options): string {
  return options.locale === 'no'
    ? formatPostalCodeNo(input)
    : formatPostalCodeSe(input);
}

/**
 * Format an OBOS membership number
 * @example
 * ```
 * formatObosMembershipNumber('0000000', { locale: 'no' }) // => '000 00 00'
 * formatObosMembershipNumber('0000000', { locale: 'se' }) // => '000 00 00'
 * ```
 */
export function formatObosMembershipNumber(
  input: string,
  options: Options,
): string {
  // this is the same for no/se. But we want the APIs to be consistent...
  return _formatObosMembershipNumber(input);
}
