import { describe, expect, test } from 'vitest';
import { postalCodeValidator as postalCodeValidatorNo } from './no';
import { postalCodeValidator as postalCodeValidatorSe } from './se';

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
});
