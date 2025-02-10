import { replaceIfMatch } from './utils';

// Regular phone number format is: 00 00 00 00
// if the number starts with 8, it's an 800-series number, with the format: 800 00 000
// See https://sprakradet.no/godt-og-korrekt-sprak/rettskriving-og-grammatikk/tall-tid-dato/
const REGULAR_PHONE_NUMBER_FORMAT = /^(\d{2})(\d{2})(\d{2})(\d{2})$/;
const EIGHT_HUNDRED_SERIES_PHONE_NUMBER_FORMAT = /^(\d{3})(\d{2})(\d{3})$/;

/**
 * Format a phone number
 * @example
 * ```
 * formatPhoneNumber('00000000') // => '00 00 00 00'
 * formatPhoneNumber('80000000') // => '800 00 000'
 * ```
 */
export function formatPhoneNumber(input: string): string {
  const number = replaceIfMatch(
    input,
    REGULAR_PHONE_NUMBER_FORMAT,
    '$1 $2 $3 $4',
  );

  // if the number starts with 8, it's an 800-series number, so we'll format it differently
  return number.startsWith('8')
    ? replaceIfMatch(
        number,
        EIGHT_HUNDRED_SERIES_PHONE_NUMBER_FORMAT,
        '$1 $2 $3',
      )
    : number;
}

const ORG_NUMBER_FORMAT = /^(\d{3})(\d{3})(\d{3})$/;

/**
 * Format an organization number
 * @example
 * ```
 * formatOrganizationNumber('000000000') // => '000 000 000'
 * ```
 */
export function formatOrganizationNumber(input: string): string {
  return replaceIfMatch(input, ORG_NUMBER_FORMAT, '$1 $2 $3');
}

const OBOS_MEMBERSHIP_NUMBER_FORMAT = /^(\d{3})(\d{2})(\d{2})$/;

/**
 * Format an OBOS membership number
 * @example
 * ```
 * formatObosMembershipNumber('0000000') // => '000 00 00'
 * ```
 */
export function formatObosMembershipNumber(input: string): string {
  return replaceIfMatch(input, OBOS_MEMBERSHIP_NUMBER_FORMAT, '$1 $2 $3');
}

const POSTAL_CODE_FORMAT = /^(\d{4})$/;

/**
 * Format a postal code
 * @example
 * ```
 * formatPostalCode('0000') // => '0000'
 * ```
 */
export function formatPostalCode(input: string): string {
  return replaceIfMatch(input, POSTAL_CODE_FORMAT, '$1');
}

const BANK_ACCOUNT_NUMBER_FORMAT = /^(\d{4})\d{2}\d{5}$/;

/**
 * Format a bank account number
 * @example
 * ```
 * formatBankAccountNumber('00000000000') // => '0000 00 00000'
 * ```
 */
export function formatBankAccountNumber(input: string): string {
  return replaceIfMatch(input, BANK_ACCOUNT_NUMBER_FORMAT, '$1 $2 $3');
}
