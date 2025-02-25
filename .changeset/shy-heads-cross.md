---
"@obosbbl/validation": minor
---

add method `validateNationalIdentityNumber()`

Validates that the input is a valid Norwegian national identity number (either a fødselsnummer or a D-nummer).
It validates the checksum and checks if the date of birth is valid.

```
import { validateNationalIdentityNumber } from "@obosbbl/validation/no";

// Fødselsnummer
validatePersonalIdentityNumber('21075417753') // => true

// D-nummer
validatePersonalIdentityNumber('53097248016') // => true
```
