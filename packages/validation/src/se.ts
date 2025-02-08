/**
 * Validates the input value as a valid Swedish postal (zip) code.
 * Valid format is either `00 000` or `00000`.
 */
export function postalCodeValidator(value: string): boolean {
  return /^\d{3} ?\d{2}$/.test(value);
}

type PhoneNumberOptions = {
  mobileOnly?: boolean;
};

export function phoneNumberValidator(
  value: string,
  options: PhoneNumberOptions = {},
): boolean {
  if (options.mobileOnly) {
    const isMobileNumber = /^07\d{8}$/.test(value);
    return isMobileNumber;
  }

  const isPhoneNumber = /^0\d{7,9}$/.test(value);

  return isPhoneNumber;
}
