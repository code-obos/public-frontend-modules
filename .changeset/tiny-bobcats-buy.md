---
"@obosbbl/validation": patch
---

add method `no/validateAccountNumber()`

Validates that the input is a valid Norwegian bank account number.

```
    import { validateAccountNumber } from "@obosbbl/validation/no";

    validateAccountNumber('12345678903') // => true

```
