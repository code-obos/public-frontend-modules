---
"@obosbbl/validation": patch
---

add method `no/validateAccountNumber()`

Validates that the input is a valid Norwegian national identity number (either a fødselsnummer or a D-nummer).
It validates the checksum and checks if the date of birth is valid.

```
    import { validateAccountNumber } from "@obosbbl/validation/no";

    validateAccountNumber('12345678903') // => true

```
