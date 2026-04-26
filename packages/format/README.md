# @obosbbl/format

[![NPM Version](https://img.shields.io/npm/v/%40obosbbl%2Fformat)](https://www.npmjs.com/package/@obosbbl/format)


A collection of formatting functions for both 🇳🇴 and 🇸🇪 with zero dependencies.

## Install

```sh
# npm
npm install @obosbbl/format

# pnpm
pnpm add @obosbbl/format
```

## Usage

The package has three entrypoints. The default entrypoints requires you to specify the locale as an options argument to the method. The package also exports entrypoints for `no` and `se` only methods. That allows you to import for only the locale you support if need be.

Note that the methods are very lenient when attempting to format the input. It will strip all characters that aren't digits or letters before it applies the formatting.
That way any existing format of the input won't affect the formatted output

If unable to format the input, the method will return the (cleaned) input as is.

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

## Methods

* formatPhoneNumber
* formatOrganizationNumber
* formatAccountNumber
* formatObosMembershipNumber
* formatPostalCode
