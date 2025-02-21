---
"@obosbbl/format": patch
---

fix formatting of Swedish phone numbers that start with the area code 010

Previously it didn't recognize 010 as a 3 digit area code, so the format would be wrong.

```js
// before
formatPhoneNumber('010-1234567'); // -> 0101-23 45 67
// after
formatPhoneNumber('010-1234567'); // -> 010-123 45 67
```
