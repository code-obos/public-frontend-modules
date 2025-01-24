const ORG_NUMBER_FORMAT = /^(\d{3})(\d{3})(\d{3})$/;

/**
 * Format an organization number
 * @example
 * ```
 * formatOrganizationNumber('000000000') // => '000 000 000'
 * ```
 */
export function formatOrganizationNumber(number: string): string {
  return number.replace(ORG_NUMBER_FORMAT, '$1 $2 $3');
}

const OBOS_MEMBERSHIP_NUMBER_FORMAT = /^(\d{3})(\d{2})(\d{2})$/;

/**
 * Format an OBOS membership number
 * @example
 * ```
 * formatObosMembershipNumber('0000000') // => '000 00 00'
 * ```
 */
export function formatObosMembershipNumber(number: string): string {
  return number.replace(OBOS_MEMBERSHIP_NUMBER_FORMAT, '$1 $2 $3');
}
