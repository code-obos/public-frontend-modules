---
"@obosbbl/validation": minor
---

add method `se/validateNationalIdentityNumber()`

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
