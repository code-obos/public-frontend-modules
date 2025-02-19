---
"@obosbbl/format": patch
---

allow country code for phone number input in `formatPhoneNumber()`.

Previously it was unable to format phone numbers with country codes (+47, +46), now it can.
Note that the country code will _not_ be part of the formatted output.

```js
// 🇳🇴 example
formatPhoneNumber('+4700000000') // => '00 00 00 00'

// 🇸🇪 example
formatPhoneNumber('+46303123456') // => '0303-12 34 56'
```
