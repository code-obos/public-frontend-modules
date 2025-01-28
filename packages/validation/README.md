# @obosbbl/validation

[![NPM Version](https://img.shields.io/npm/v/%40obosbbl%2Fvalidation)](https://www.npmjs.com/package/@obosbbl/validation)


A collection of validation utilities for both 🇳🇴 and 🇸🇪 with zero dependencies.

## Install

```sh
# npm
npm install @obosbbl/validation

# pnpm
pnpm add @obosbbl/validation
```

## Usage

The package has two entrypoints, one for `no` and one for `se`. That allows you to import for only the locale you need.


```js
// 🇳🇴 example
import { postalCodeValidator } from '@obosbbl/validation/no';
postalCodeValidator('0000') // => true
postalCodeValidator('00000') // => false

// 🇸🇪 example
import { postalCodeValidator } from '@obosbbl/validation/no';
postalCodeValidator('00000') // => true
postalCodeValidator('00 000') // => true
postalCodeValidator('000 000') // => false
```

## Methods

* validatePostalCode
