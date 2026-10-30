import { cleanInput, replaceIfMatch } from './utils';

// Regular phone number format is: 00 00 00 00
// if the number starts with 8, it's an 800-series number, with the format: 800 00 000
// 116-series numbers are grouped in threes: 116 000
// Numbers with three, four or five digits are written as a single group: 1234
// See https://sprakradet.no/godt-og-korrekt-sprak/rettskriving-og-grammatikk/tall-tid-dato/
const REGULAR_PHONE_NUMBER_FORMAT = /^(\d{2})(\d{2})(\d{2})(\d{2})$/;
const EIGHT_HUNDRED_SERIES_PHONE_NUMBER_FORMAT = /^(\d{3})(\d{2})(\d{3})$/;
const ONE_ONE_SIX_SERIES_PHONE_NUMBER_FORMAT = /^(116)(\d{3})$/;

/**
 * Format a phone number.
 *
 * Country code can be present in the input, but it will be removed in the formatted output.
 *
 * @example
 * ```
 * formatPhoneNumber('00000000') // => '00 00 00 00'
 * formatPhoneNumber('80000000') // => '800 00 000'
 * formatPhoneNumber('+4700000000') // => '00 00 00 00'
 * formatPhoneNumber('116123') // => '116 123'
 * formatPhoneNumber('1234') // => '1234'
 * ```
 */
export function formatPhoneNumber(input: string): string {
  // remove country code
  // biome-ignore lint/style/noParameterAssign:
  input = input.replace(/^\+47/, '');

  const cleaned = cleanInput(input);

  // short numbers (three to five digits) are written as a single group
  if (/^\d{3,5}$/.test(cleaned)) {
    return cleaned;
  }

  if (ONE_ONE_SIX_SERIES_PHONE_NUMBER_FORMAT.test(cleaned)) {
    return replaceIfMatch(
      cleaned,
      ONE_ONE_SIX_SERIES_PHONE_NUMBER_FORMAT,
      '$1 $2',
    );
  }

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
