# @obosbbl/validation

[![NPM Version](https://img.shields.io/npm/v/%40obosbbl%2Fvalidation)](https://www.npmjs.com/package/@obosbbl/validation)


A collection of validation methods for both 🇳🇴 and 🇸🇪 with zero dependencies. Integrates neatly with [Zod](https://github.com/colinhacks/zod).

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

## Strictness

By default, the methods allows formatting characters when validating. If you need strict validation, you can pass the `strict` option to the method.

```js
import { validateOrganizationNumber } from '@obosbbl/validation/no';

validateOrganizationNumber('937 052 766') // true;

validateOrganizationNumber('937052766', { strict: true }) // true;
validateOrganizationNumber('937 052 766', { strict: true }) // false;
```

```js

## Methods

* validatePostalCode
* validatePhoneNumber
   * supports mobileOnly option
* validateOrganizationNumber
