# @obosbbl/validation

## 0.3.0

### Minor Changes

- 1dfc896: add method `validateNationalIdentityNumber()`

  Validates that the input is a valid Norwegian national identity number (either a fødselsnummer or a D-nummer).
  It validates the checksum and checks if the date of birth is valid.

  ```
  import { validateNationalIdentityNumber } from "@obosbbl/validation/no";

  // Fødselsnummer
  validatePersonalIdentityNumber('21075417753') // => true

  // D-nummer
  validatePersonalIdentityNumber('53097248016') // => true
  ```

## 0.2.0

### Minor Changes

- b444dd8: feat: add method `validateObosMembershipNumber()` to validate if the input value is a valid OBOS membership number.

## 0.1.0

### Minor Changes

- 66676fe: initial release
