import { mod11, stripFormatting } from './utils';

type PostalCodeOptions = {
  /**
   * Disallow formatting characters
   * @default false
   */
  strict?: boolean;
};

/**
 * Validates the input value as a valid Norwegian postal (zip) code.
 * Valid format is `0000`.
 */
export function validatePostalCode(
  value: string,
  options: PostalCodeOptions = {},
): boolean {
  if (!options.strict) {
    value = stripFormatting(value);
  }

  return /^\d{4}$/.test(value);
}

type PhoneNumberOptions = {
  /**
   * Whether it should be a mobile number
   * @default false
   */
  mobileOnly?: boolean;
  /**
   * Disallow formatting characters
   * @default false
   */
  strict?: boolean;
};

export function validatePhoneNumber(
  value: string,
  options: PhoneNumberOptions = {},
): boolean {
  if (!options.strict) {
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

/**
 * Validates the input value as a valid {@link https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/organisasjonsnummeret/ Norwegian organization number}.
 * Valid format is 9 digits, spaces allowed, eg `000000000` or `000 000 000`.
 */
export function validateOrganizationNumber(value: string): boolean {
  /** References:
   * https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/organisasjonsnummeret/
   * https://no.wikipedia.org/wiki/Organisasjonsnummer
   */
  return mod11(value, [3, 2, 7, 6, 5, 4, 3, 2]);
}
