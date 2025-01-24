import { describe, expect, test } from 'vitest';
import {
  formatObosMembershipNumber as formatObosMembershipNumberNo,
  formatOrganizationNumber as formatOrganizationNumberNo,
} from './no';
import {
  formatObosMembershipNumber as formatObosMembershipNumberSe,
  formatOrganizationNumber as formatOrganizationNumberSe,
} from './se';

describe('no', () => {
  test.each([
    ['000000000', '000 000 000'],
    ['000 000 000', '000 000 000'],
    ['000-000-000', '000 000 000'],
    ['abc', 'abc'],
  ])('formatOrganizationNumber(%s) -> %s', (input, expected) => {
    expect(formatOrganizationNumberNo(input)).toBe(expected);
  });
});

describe('se', () => {
  test.each([
    ['0000000000', '000000-0000'],
    ['000000-0000', '000000-0000'],
    ['000000 0000', '000000-0000'],
    [' 000000 0000 ', '000000-0000'],
    ['000', '000'],
    ['abc', 'abc'],
  ])('formatOrganizationNumber(%s) -> %s', (input, expected) => {
    expect(formatOrganizationNumberSe(input)).toBe(expected);
  });
});

test.each([
  ['0000000', '000 00 00'],
  ['000 00 00', '000 00 00'],
  ['000-00-00', '000 00 00'],
])('formatObosMembershipNumber(%s) -> %s', (input, expected) => {
  // don't split these by country, since they're essentially the same method
  // we still test both though, to ensure there's no difference between them
  expect(formatObosMembershipNumberNo(input)).toBe(expected);
  expect(formatObosMembershipNumberSe(input)).toBe(expected);
});
