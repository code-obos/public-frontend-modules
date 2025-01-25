import { replaceIfMatch } from './utils';

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
export function formatPhoneNumber(number: string): string {
  if (number.startsWith('8')) {
    return number.replace(EIGHT_HUNDRED_SERIES_PHONE_NUMBER_FORMAT, '$1 $2 $3');
  }

  return number.replace(DEFAULT_PHONE_NUMBER_FORMAT, '$1 $2 $3 $4');
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
