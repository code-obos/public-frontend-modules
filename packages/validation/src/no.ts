/**
 * Validates the input value as a valid Norwegian postal (zip) code.
 * Valid format is `0000`.
 */
export function postalCodeValidator(value: string): boolean {
  return /^\d{4}$/.test(value);
}

type PhoneNumberOptions = {
  mobileOnly?: boolean;
};

export function phoneNumberValidator(
  value: string,
  options: PhoneNumberOptions = {},
): boolean {
  const isPhoneNumber = /^\d{8}$/.test(value);

  if (options.mobileOnly) {
    // Norwegian mobile phone numbers start with 4 or 9
    // See https://nkom.no/telefoni-og-telefonnummer/telefonnummer-og-den-norske-nummerplan/alle-nummerserier-for-norske-telefonnumre
    return isPhoneNumber && ['4', '9'].includes(value.charAt(0));
  }

  return isPhoneNumber;
}
