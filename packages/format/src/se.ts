import { replaceIfMatch } from './utils';

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
