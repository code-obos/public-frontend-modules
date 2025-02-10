import { describe, expect, test } from 'vitest';
import * as no from './no';
import * as se from './se';

describe('no', () => {
  test.each([
    ['0179', true],

    ['01790', false],
    ['not a number', false],
  ])('validatePostalCode()', (input, expected) => {
    expect(no.validatePostalCode(input)).toBe(expected);
  });

  test.each([
    ['22865500', true],
    ['90000000', true],
    ['40000000', true],
    ['22 86 55 00', false],
    ['000', false],
    ['000000000', false],

    // formatting
    ['22 86 55 00', false, { allowFormatting: false }],
    ['22 86 55 00', true, { allowFormatting: true }],

    // mobile only
    ['22865500', false, { mobileOnly: true }],
    ['90000000', true, { mobileOnly: true }],
    ['40000000', true, { mobileOnly: true }],
  ])('validatePhoneNumber()', (input, expected, options) => {
    expect(no.validatePhoneNumber(input, options)).toBe(expected);
  });

  test.each([
    ['937052766', true],
    ['937 052 766', false],
    ['435256151', false],
    ['not a number', false],
    ['A37 052 766', false],

    // formatting
    ['937 052 766', false, { allowFormatting: false }],
    ['937 052 766', true, { allowFormatting: true }],
  ])('validateOrganizationNumber()', (input, expected) => {
    expect(no.validateOrganizationNumber(input)).toBe(expected);
  });
});

describe('se', () => {
  test.each([
    ['00000', true],
    ['000 00', true],

    // strictness
    ['000 00', false, { strict: true }],

    ['00', false],
    ['not a number', false],
  ])('validatePostalCode()', (input, expected) => {
    expect(se.validatePostalCode(input)).toBe(expected);
  });

  test.each([
    ['22865500', true],
    ['22 86 55 00', true],
    ['90000000', true],
    ['40000000', true],
    ['000', false],
    ['000000000', false],

    // strictness
    ['22 86 55 00', false, { strict: true }],

    // mobile only
    ['22 86 55 00', false, { mobileOnly: true }],
    ['900 00 000', true, { mobileOnly: true }],
    ['400 00 000', true, { mobileOnly: true }],
  ])('validatePhoneNumber()', (input, expected, options) => {
    expect(se.validatePhoneNumber(input, options)).toBe(expected);
  });

  test.each([
    ['937052766', true],
    ['937 052 766', true],

    ['A37 052 766', false],
    ['435 256 151', false],
    ['not a number', false],
  ])('validateOrganizationNumber()', (input, expected) => {
    expect(se.validateOrganizationNumber(input)).toBe(expected);
  });
});

// describe('no', () => {
//   describe('validatePostalCode', () => {
//     test('correctly validates postal codes', () => {
//       expect(validatePostalCodeSe('100 26')).toBeTruthy();
//       expect(validatePostalCodeSe('10026')).toBeTruthy();

//       expect(validatePostalCodeSe('100426')).toBeFalsy();
//       expect(validatePostalCodeSe('177')).toBeFalsy();
//       expect(validatePostalCodeSe(Number.NaN.toString())).toBeFalsy();
//       expect(validatePostalCodeSe('not a number')).toBeFalsy();
//     });
//   });

//   describe('validatePhoneNumber()', () => {
//     test('validates phone numbers', () => {
//       // should be 8 to 10 digits
//       expect(validatePhoneNumberSe('08123456')).toBeTruthy();
//       expect(validatePhoneNumberSe('031123456')).toBeTruthy();
//       expect(validatePhoneNumberSe('0311234567')).toBeTruthy();

//       // too short
//       expect(validatePhoneNumberSe('0812345')).toBeFalsy();
//       // too long
//       expect(validatePhoneNumberSe('0303123456789')).toBeFalsy();

//       // cannot start with something other than 0
//       expect(validatePhoneNumberSe('12345678')).toBeFalsy();

//       // A Swedish mobile number is always 10 digits and starts with 07
//       expect(
//         validatePhoneNumberSe('0712345678', { mobileOnly: true }),
//       ).toBeTruthy();
//     });
//   });
// });
