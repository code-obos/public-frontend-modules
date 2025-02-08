import { describe, expect, test } from 'vitest';
import {
  phoneNumberValidator as phoneNumberValidatorNo,
  postalCodeValidator as postalCodeValidatorNo,
} from './no';
import {
  phoneNumberValidator as phoneNumberValidatorSe,
  postalCodeValidator as postalCodeValidatorSe,
} from './se';

describe('Norwegian', () => {
  describe('postalCodeValidator()', () => {
    test('correctly validates postal codes', () => {
      expect(postalCodeValidatorNo('1067')).toBeTruthy();

      expect(postalCodeValidatorNo('1.67')).toBeFalsy();
      expect(postalCodeValidatorNo('10677')).toBeFalsy();
      expect(postalCodeValidatorNo(Number.NaN.toString())).toBeFalsy();
      expect(postalCodeValidatorNo('not a number')).toBeFalsy();
    });
  });

  describe('phoneNumberValidator()', () => {
    test('validates phone numbers', () => {
      expect(phoneNumberValidatorNo('22865500')).toBeTruthy();
      expect(phoneNumberValidatorNo('228655000')).toBeFalsy();

      expect(
        phoneNumberValidatorNo('40 00 00 00', { mobileOnly: true }),
      ).toBeTruthy();
      expect(
        phoneNumberValidatorNo('99 99 99 99', { mobileOnly: true }),
      ).toBeTruthy();
      expect(
        phoneNumberValidatorNo('22865500', { mobileOnly: true }),
      ).toBeFalsy();
    });
  });
});

describe('Swedish', () => {
  describe('postalCodeValidator()', () => {
    test('correctly validates postal codes', () => {
      expect(postalCodeValidatorSe('100 26')).toBeTruthy();
      expect(postalCodeValidatorSe('10026')).toBeTruthy();

      expect(postalCodeValidatorSe('100426')).toBeFalsy();
      expect(postalCodeValidatorSe('177')).toBeFalsy();
      expect(postalCodeValidatorSe(Number.NaN.toString())).toBeFalsy();
      expect(postalCodeValidatorSe('not a number')).toBeFalsy();
    });
  });

  describe('phoneNumberValidator()', () => {
    test('validates phone numbers', () => {
      // should be 8 to 10 digits
      expect(phoneNumberValidatorSe('08123456')).toBeTruthy();
      expect(phoneNumberValidatorSe('031123456')).toBeTruthy();
      expect(phoneNumberValidatorSe('0311234567')).toBeTruthy();

      // too short
      expect(phoneNumberValidatorSe('0812345')).toBeFalsy();
      // too long
      expect(phoneNumberValidatorSe('0303123456789')).toBeFalsy();

      // cannot start with something other than 0
      expect(phoneNumberValidatorSe('12345678')).toBeFalsy();

      // A Swedish mobile number is always 10 digits and starts with 07
      expect(
        phoneNumberValidatorSe('0712345678', { mobileOnly: true }),
      ).toBeTruthy();
    });
  });
});
