# @obosbbl/validation

## 0.3.1

### Patch Changes

- bb45e14: add method `no/validateAccountNumber()`

  Validates that the input is a valid Norwegian bank account number.

  ```
      import { validateAccountNumber } from "@obosbbl/validation/no";

      validateAccountNumber('12345678903') // => true

  ```

## 0.3.0

### Minor Changes

- 1dfc896: add method `no/validateNationalIdentityNumber()`

  Validates that the input is a valid Norwegian national identity number (either a fødselsnummer or a D-nummer).
  It validates the checksum and checks if the date of birth is valid.

  ```
  import { validateNationalIdentityNumber } from "@obosbbl/validation/no";

  // Fødselsnummer
  validatePersonalIdentityNumber('21075417753') // => true

  // D-nummer
  validatePersonalIdentityNumber('53097248016') // => true
  ```

- 2491f32: add method `se/validateNationalIdentityNumber()`

  Validates that the input is a valid Swedish national identity number (either a personnummer or a samordningsnummer).
  It validates the checksum and checks if the date of birth is valid.

  It supports both short (10 digits) and long (12 digits) formats, with a separator if the `allowFormatting` option is set to `true`.

  ```
  import { validateNationalIdentityNumber } from "@obosbbl/validation/se";

  // short
  validatePersonalIdentityNumber('YYMMDDXXXX') // true

  // short with separator
  validatePersonalIdentityNumber('YYMMDD-XXXX', { allowFormatting: true }) // true

  // long
  validatePersonalIdentityNumber('YYYYMMDDXXXX') // true

  // long input, validate short format
  validatePersonalIdentityNumber('YYYYMMDDXXXX', { format: 'short' }) // false
  ```

### Patch Changes

- b1c13ed: add checksum validation of Swedish organization numbers. Previously we only checked the length of the number.

## 0.2.0

### Minor Changes

- b444dd8: feat: add method `validateObosMembershipNumber()` to validate if the input value is a valid OBOS membership number.

## 0.1.0

### Minor Changes

- 66676fe: initial release
