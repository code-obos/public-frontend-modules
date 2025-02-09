import { stripFormatting } from './utils';

type PostalCodeOptions = {
  /**
   * Disallow formatting characters
   * @default false
   */
  strict?: boolean;
};

/**
 * Validates the input value as a valid Swedish postal (zip) code.
 * Valid format is either `00 000` or `00000`.
 */
export function validatePostalCode(
  value: string,
  options: PostalCodeOptions = {},
): boolean {
  if (!options.strict) {
    value = stripFormatting(value);
  }

  return /^\d{3} ?\d{2}$/.test(value);
}

type PhoneNumberOptions = {
  mobileOnly?: boolean;
  strict?: boolean;
};

export function validatePhoneNumber(
  value: string,
  options: PhoneNumberOptions = {},
): boolean {
  if (!options.strict) {
    value = stripFormatting(value);
  }

  if (options.mobileOnly) {
    const isMobileNumber = /^07\d{8}$/.test(value);
    return isMobileNumber;
  }

  const isPhoneNumber = /^0\d{7,9}$/.test(value);

  return isPhoneNumber;
}

export function validateOrganizationNumber(
  value: string,
  options: PhoneNumberOptions = {},
): boolean {
  if (!options.strict) {
    value = stripFormatting(value);
  }

  return /^\d{10}$/.test(value);
}
