import { cleanInput, replaceIfMatch } from './utils';

const MOBILE_PHONE_NUMBER_FORMAT = /^(07[02369]{1})(\d{3})(\d{2})(\d{2})$/;
// subscriber numbers, without the area codes, can be 5, 6, 7 or 8 digits long
const SUBSCRIBER_NUMBER_FORMATS = {
  5: /^(\d{3})(\d{2})$/,
  6: /^(\d{2})(\d{2})(\d{2})$/,
  7: /^(\d{3})(\d{2})(\d{2})$/,
  8: /^(\d{3})(\d{3})(\d{2})$/,
};
// SE numbers have area codes of 2, 3 or 4 digits
const TWO_DIGIT_AREA_CODE = /^08/;
const THREE_DIGIT_AREA_CODE =
  /^0(11|13|16|18|19|21|23|26|31|33|35|36|40|42|44|46|54|60|63|90)/;

/**
 * Format a phone number
 * @example
 * ```
 * formatPhoneNumber('07012345678') // => '070-123 45 678'
 * formatPhoneNumber('0812345') // => '08-123 45'
 * formatPhoneNumber('0311234567') // => '031-123 45 67'
 * formatPhoneNumber('0303123456') // => '0303-12 34 56'
 * ```
 */
export function formatPhoneNumber(input: string): string {
  const normalizedInput = cleanInput(input);

  if (MOBILE_PHONE_NUMBER_FORMAT.test(normalizedInput)) {
    return normalizedInput.replace(MOBILE_PHONE_NUMBER_FORMAT, '$1-$2 $3 $4');
  }

  const areaCodeLength = TWO_DIGIT_AREA_CODE.test(normalizedInput)
    ? 2
    : THREE_DIGIT_AREA_CODE.test(normalizedInput)
      ? 3
      : 4;

  const areaCode = normalizedInput.substring(0, areaCodeLength);
  const subscriberNumber = normalizedInput.substring(areaCodeLength);

  // if the subscriber number length is not in the formats, return the input as is
  if (!(subscriberNumber.length in SUBSCRIBER_NUMBER_FORMATS)) {
    return normalizedInput;
  }

  const subscriberNumberFormat =
    SUBSCRIBER_NUMBER_FORMATS[
      // the cast should be okay here, as we've checked the length above
      subscriberNumber.length as keyof typeof SUBSCRIBER_NUMBER_FORMATS
    ];

  const replacePattern = subscriberNumber.length === 5 ? '$1 $2' : '$1 $2 $3';

  return `${areaCode}-${subscriberNumber.replace(subscriberNumberFormat, replacePattern)}`;
}

const ORG_NUMBER_FORMAT = /^(\d{6})(\d{4})$/;

/**
 * Format an organization number
 * @example
 * ```
 * formatOrganizationNumber('0000000000') // => '000000-0000'
 * ```
 */
export function formatOrganizationNumber(input: string): string {
  return replaceIfMatch(input, ORG_NUMBER_FORMAT, '$1-$2');
}

const POSTAL_CODE_FORMAT = /^(\d{3})(\d{2})$/;

/**
 * Format a postal code
 * @example
 * ```
 * format('00000') // => '000 00'
 * ```
 */
export function formatPostalCode(input: string): string {
  return replaceIfMatch(input, POSTAL_CODE_FORMAT, '$1 $2');
}

// just reexport the no method for API feature parity
export { formatObosMembershipNumber } from './no';
