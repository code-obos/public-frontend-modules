import navfaker from 'nav-faker/dist/index';
import { describe, expect, test } from 'vitest';
import * as no from './no';
import * as se from './se';

describe('no', () => {
  test.each([
    ['0179', true],
    ['01790', false],
    ['not a number', false],
  ])('validatePostalCode(%s) -> %s', (input, expected) => {
    expect(no.validatePostalCode(input)).toBe(expected);
  });

  test.each([
    ['22865500', true, undefined],
    ['90000000', true, undefined],
    ['40000000', true, undefined],
    ['22 86 55 00', false, undefined],
    ['000', false, undefined],
    ['000000000', false, undefined],

    // formatting
    ['22 86 55 00', false, { allowFormatting: false }],
    ['22 86 55 00', true, { allowFormatting: true }],

    // mobile only
    ['22865500', false, { mobileOnly: true }],
    ['90000000', true, { mobileOnly: true }],
    ['40000000', true, { mobileOnly: true }],
  ])('validatePhoneNumber(%s) -> %s', (input, expected, options) => {
    expect(no.validatePhoneNumber(input, options)).toBe(expected);
  });

  test.each([
    ['937052766', true, undefined],
    ['937 052 766', false, undefined],
    ['435256151', false, undefined],
    ['not a number', false, undefined],
    ['A37 052 766', false, undefined],

    // formatting
    ['937 052 766', false, { allowFormatting: false }],
    ['937 052 766', true, { allowFormatting: true }],
  ])('validateOrganizationNumber(%s) -> %s', (input, expected, options) => {
    expect(no.validateOrganizationNumber(input, options)).toBe(expected);
  });

  test.each([
    ['1234567', true, undefined],
    // too short
    ['123456', false, undefined],
    // too long
    ['12345678', false, undefined],

    // formatting
    ['123 45 67', false, { allowFormatting: false }],
    ['123 45 67', true, { allowFormatting: true }],
  ])('validateObosMembershipNumber(%s) -> %s', (input, expected, options) => {
    expect(no.validateObosMembershipNumber(input, options)).toBe(expected);
  });

  test('validateNationalIdentityNumber()', () => {
    for (let i = 0; i < 1000; ++i) {
      expect(
        no.validateNationalIdentityNumber(
          navfaker.personIdentifikator.fødselsnummer(),
        ),
      ).toBe(true);
      expect(
        no.validateNationalIdentityNumber(
          navfaker.personIdentifikator.dnummer(),
        ),
      ).toBe(true);
    }
  });
});

describe('se', () => {
  test.each([
    ['00000', true, undefined],
    ['000 00', false, undefined],
    ['not a number', false, undefined],

    // formatting
    ['000 00', false, { allowFormatting: false }],
    ['000 00', true, { allowFormatting: true }],
  ])('validatePostalCode(%s) -> %s', (input, expected, options) => {
    expect(se.validatePostalCode(input, options)).toBe(expected);
  });

  test.each([
    ['08123456', true, undefined],
    ['0812345', false, undefined],
    ['031123456', true, undefined],
    ['030312345678', false, undefined],

    // formatting
    ['031-123 45', true, { allowFormatting: true }],
    ['031-123 45', false, { allowFormatting: false }],

    // mobile only
    // test all valid area codes (070, 072, 073, 076, 079)
    ['0701234567', true, { mobileOnly: true }],
    ['0711234567', false, { mobileOnly: true }],
    ['0721234567', true, { mobileOnly: true }],
    ['0731234567', true, { mobileOnly: true }],
    ['0741234567', false, { mobileOnly: true }],
    ['0751234567', false, { mobileOnly: true }],
    ['0761234567', true, { mobileOnly: true }],
    ['0771234567', false, { mobileOnly: true }],
    ['0781234567', false, { mobileOnly: true }],
    ['0791234567', true, { mobileOnly: true }],
    // landline
    ['031123456', false, { mobileOnly: true }],
    // too long
    ['07012345678', false, { mobileOnly: true }],
  ])('validatePhoneNumber(%s) -> %s', (input, expected, options) => {
    expect(se.validatePhoneNumber(input, options)).toBe(expected);
  });

  test.each([
    ['5592221054', true, undefined],
    ['559222-1054', false, undefined],
    ['559222105', false, undefined],
    ['55922210546', false, undefined],

    // formatting
    ['559222-1054', false, { allowFormatting: false }],
    ['559222-1054', true, { allowFormatting: true }],
  ])('validateOrganizationNumber(%s) -> %s', (input, expected, options) => {
    expect(se.validateOrganizationNumber(input, options)).toBe(expected);
  });

  test.each([
    ['1234567', true, undefined],
    // too short
    ['123456', false, undefined],
    // too long
    ['12345678', false, undefined],

    // formatting
    ['123 45 67', false, { allowFormatting: false }],
    ['123 45 67', true, { allowFormatting: true }],
  ])('validateObosMembershipNumber(%s) -> %s', (input, expected, options) => {
    expect(se.validateObosMembershipNumber(input, options)).toBe(expected);
  });
});
