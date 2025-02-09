import { describe, expect, test } from 'vitest';
import {
  validateOrganizationNumber,
  validatePhoneNumber as validatePhoneNumberNo,
  validatePostalCode as validatePostalCodeNo,
} from './no';
import {
  validatePhoneNumber as validatePhoneNumberSe,
  validatePostalCode as validatePostalCodeSe,
} from './se';

describe('Norwegian', () => {
  describe('validatePostalCode()', () => {
    test('correctly validates postal codes', () => {
      expect(validatePostalCodeNo('1067')).toBeTruthy();

      expect(validatePostalCodeNo('1.67')).toBeFalsy();
      expect(validatePostalCodeNo('10677')).toBeFalsy();
      expect(validatePostalCodeNo(Number.NaN.toString())).toBeFalsy();
      expect(validatePostalCodeNo('not a number')).toBeFalsy();
    });
  });

  describe('validatePhoneNumber()', () => {
    test('validates phone numbers', () => {
      expect(validatePhoneNumberNo('22865500')).toBeTruthy();
      expect(validatePhoneNumberNo('228655000')).toBeFalsy();

      expect(
        validatePhoneNumberNo('40 00 00 00', { mobileOnly: true }),
      ).toBeTruthy();
      expect(
        validatePhoneNumberNo('99 99 99 99', { mobileOnly: true }),
      ).toBeTruthy();
      expect(
        validatePhoneNumberNo('22865500', { mobileOnly: true }),
      ).toBeFalsy();
    });
  });

  describe('orgNumberValidator()', () => {
    test('correctly validates organization numbers', () => {
      // Valid numbers generated here https://norske-testdata.no/orgnr/

      expect(validateOrganizationNumber('737523063')).toBeTruthy();
      expect(validateOrganizationNumber('737 523 063')).toBeTruthy();

      expect(validateOrganizationNumber('352317411')).toBeTruthy();
      expect(validateOrganizationNumber('352 317 411')).toBeTruthy();

      expect(validateOrganizationNumber('306728156')).toBeTruthy();
      expect(validateOrganizationNumber('306 728 156')).toBeTruthy();

      expect(validateOrganizationNumber('A52317411')).toBeFalsy();
      expect(validateOrganizationNumber('435 256 151')).toBeFalsy();
      expect(validateOrganizationNumber('435 256 156')).toBeFalsy();
      expect(validateOrganizationNumber('435 256 1564')).toBeFalsy();
      expect(validateOrganizationNumber('10')).toBeFalsy();
      expect(validateOrganizationNumber(Number.NaN.toString())).toBeFalsy();
      expect(validateOrganizationNumber('not a number')).toBeFalsy();
    });
  });
});

describe('Swedish', () => {
  describe('validatePostalCode', () => {
    test('correctly validates postal codes', () => {
      expect(validatePostalCodeSe('100 26')).toBeTruthy();
      expect(validatePostalCodeSe('10026')).toBeTruthy();

      expect(validatePostalCodeSe('100426')).toBeFalsy();
      expect(validatePostalCodeSe('177')).toBeFalsy();
      expect(validatePostalCodeSe(Number.NaN.toString())).toBeFalsy();
      expect(validatePostalCodeSe('not a number')).toBeFalsy();
    });
  });

  describe('validatePhoneNumber()', () => {
    test('validates phone numbers', () => {
      // should be 8 to 10 digits
      expect(validatePhoneNumberSe('08123456')).toBeTruthy();
      expect(validatePhoneNumberSe('031123456')).toBeTruthy();
      expect(validatePhoneNumberSe('0311234567')).toBeTruthy();

      // too short
      expect(validatePhoneNumberSe('0812345')).toBeFalsy();
      // too long
      expect(validatePhoneNumberSe('0303123456789')).toBeFalsy();

      // cannot start with something other than 0
      expect(validatePhoneNumberSe('12345678')).toBeFalsy();

      // A Swedish mobile number is always 10 digits and starts with 07
      expect(
        validatePhoneNumberSe('0712345678', { mobileOnly: true }),
      ).toBeTruthy();
    });
  });
});
