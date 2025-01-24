import { describe, expect, test } from 'vitest';
import { formatOrganizationNumber as formatOrganizationNumberNo } from './no';
import { formatOrganizationNumber as formatOrganizationNumberSe } from './se';

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
