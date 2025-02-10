import { describe, expect, test } from 'vitest';
import * as no from './no';
import * as se from './se';

describe('no', () => {
  test.each([
    ['22865500', '22 86 55 00'],
    ['80000000', '800 00 000'],
  ])('formatPhoneNumber(%s) -> %s', (input, expected) => {
    expect(no.formatPhoneNumber(input)).toBe(expected);
  });

  test.each([
    ['000000000', '000 000 000'],
    ['000 000 000', '000 000 000'],
    ['000-000-000', '000 000 000'],
    ['abc', 'abc'],
  ])('formatOrganizationNumber(%s) -> %s', (input, expected) => {
    expect(no.formatOrganizationNumber(input)).toBe(expected);
  });

  test.each([['0000', '0000']])(
    'formatPostalCode(%s) -> %s',
    (input, expected) => {
      expect(no.formatPostalCode(input)).toBe(expected);
    },
  );

  test.each([
    ['00000000000', '0000 00 00000'],
    ['0000.00.00000', '0000 00 00000'],
  ])('formatBankAccountNumber(%s) -> %s', (input, expected) => {
    expect(no.formatBankAccountNumber(input)).toBe(expected);
  });
});

describe('se', () => {
  test.each([
    // mobile phone numbers
    ['0701234567', '070-123 45 67'],
    ['070 12 345 67', '070-123 45 67'],
    // 2 digit area code
    ['0812345', '08-123 45'],
    ['08123456', '08-12 34 56'],
    ['081234567', '08-123 45 67'],
    ['0812345678', '08-123 456 78'],
    // 3 digit area code
    ['03112345', '031-123 45'],
    ['031123456', '031-12 34 56'],
    ['0311234567', '031-123 45 67'],
    ['03112345678', '031-123 456 78'],
    // 4 digit area code
    ['030312345', '0303-123 45'],
    ['0303123456', '0303-12 34 56'],
    ['03031234567', '0303-123 45 67'],
    ['030312345678', '0303-123 456 78'],
    // invalid, too long a number
    ['0303123456789', '0303123456789'],
  ])('formatPhoneNumber(%s) -> %s', (input, expected) => {
    expect(se.formatPhoneNumber(input)).toBe(expected);
  });

  test.each([
    ['0000000000', '000000-0000'],
    ['000000-0000', '000000-0000'],
    ['000000 0000', '000000-0000'],
    [' 000000 0000 ', '000000-0000'],
    ['000', '000'],
    ['abc', 'abc'],
  ])('formatOrganizationNumber(%s) -> %s', (input, expected) => {
    expect(se.formatOrganizationNumber(input)).toBe(expected);
  });

  test.each([
    ['00000', '000 00'],
    ['000 00', '000 00'],
  ])('formatPostalCode(%s) -> %s', (input, expected) => {
    expect(se.formatPostalCode(input)).toBe(expected);
  });
});

test.each([
  ['0000000', '000 00 00'],
  ['000 00 00', '000 00 00'],
  ['000-00-00', '000 00 00'],
])('formatObosMembershipNumber(%s) -> %s', (input, expected) => {
  // don't split these by country, since they're essentially the same method
  // we still test both though, to ensure there's no difference between them
  expect(no.formatObosMembershipNumber(input)).toBe(expected);
  expect(se.formatObosMembershipNumber(input)).toBe(expected);
});
