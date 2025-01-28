---
"@obosbbl/format": minor
---

add default entrypoint for formatting functions.

This makes it easier to support both Norwegian and Swedish formatting in the same project,
but it requires you to specify the wanted locale as an options argument to the method.

Example:
```js
// Combined 🇳🇴🇸🇪 example
import { formatOrganizationNumber } from '@obosbbl/format';
formatOrganizationNumber('000000000', { locale: 'no' }) // => '000 000 000'
formatOrganizationNumber('0000000000', { locale: 'se' }) // => '000000-0000'

// 🇳🇴 only example
import { formatOrganizationNumber } from '@obosbbl/format/no';
formatOrganizationNumber('000000000') // => '000 000 000'

// 🇸🇪 only example
import { formatOrganizationNumber } from '@obosbbl/format/se';
formatOrganizationNumber('0000000000') // => '000000-0000'
```
