import { describe, expect, test } from 'vitest';
import { formatOrganizationNumber, formatPhoneNumber } from '.';

describe('no', () => {
  test.each([
    ['22865500', '22 86 55 00'],
    ['80000000', '800 00 000'],
  ])('formatPhoneNumber(%s) -> %s', (input, expected) => {
    expect(formatPhoneNumber(input, 'no')).toBe(expected);
  });

  test.each([['000000000', '000 000 000']])(
    'formatOrganizationNumber(%s) -> %s',
    (input, expected) => {
      expect(formatOrganizationNumber(input, 'no')).toBe(expected);
    },
  );
});

describe('se', () => {
  test.each([['0701234567', '070-123 45 67']])(
    'formatPhoneNumber(%s) -> %s',
    (input, expected) => {
      expect(formatPhoneNumber(input, 'se')).toBe(expected);
    },
  );

  test.each([['0000000000', '000000-0000']])(
    'formatOrganizationNumber(%s) -> %s',
    (input, expected) => {
      expect(formatOrganizationNumber(input, 'se')).toBe(expected);
    },
  );
});
