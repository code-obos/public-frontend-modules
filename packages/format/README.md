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

The package has two entrypoints, one for `no` and one for `se`. That allows you to import for only the locale you need.

Note that the methods are very lenient when attempting to format the input. It will strip all characters that aren't digits or letters before it applies the formatting.
That way any existing format of the input won't affect the formatted output

If unable to format the input, the method will return the (cleaned) input as is.

```js
// 🇳🇴 example
import { formatOrganizationNumber } from '@obosbbl/format/no';
formatOrganizationNumber('000000000') // => '000 000 000'

// 🇸🇪 example
import { formatOrganizationNumber } from '@obosbbl/format/se';
formatOrganizationNumber('0000000000') // => '000000-0000'
```

## Methods

* formatOrganizationNumber
