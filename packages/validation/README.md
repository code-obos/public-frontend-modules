# @obosbbl/validation

[![NPM Version](https://img.shields.io/npm/v/%40obosbbl%2Fvalidation)](https://www.npmjs.com/package/@obosbbl/validation)


A collection of validation methods for both 🇳🇴 and 🇸🇪 with zero dependencies.

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
import { validateOrganizationNumber } from '@obosbbl/validation/no';
validateOrganizationNumber('937052766') // => true

validateOrganizationNumber('000') // => false

// 🇸🇪 example
import { validateOrganizationNumber } from '@obosbbl/validation/se';
validateOrganizationNumber('5592221054') // => true

validateOrganizationNumber('000') // => false
```

## Strictness and formatting characters

The methods are "strict" by default, meaning no formatting characters in the input is allowed.
This is preferrable, for instance when doing server-side validation, where the input is often expected to be a "clean" value.

If you want to allow formatting characters in the input, you can pass `allowFormatting: true` in the options object to the method.


```js
import { validateOrganizationNumber } from '@obosbbl/validation/no';

validateOrganizationNumber('937052766') // true

// formatting characters disallowed by default
validateOrganizationNumber('937 052 766') // false;

// allow formatting characters
validateOrganizationNumber('937 052 766', { allowFormatting: true }) // true;
```

## Methods

* validateNationalIdentityNumber
* validatePostalCode
* validatePhoneNumber
  * supports mobileOnly option
* validateOrganizationNumber
  * Check digit verification is currently only implemented for Norwegian organization numbers. For Swedish organiation numbers, we only check the length of the input. PRs are welcome to fix this.
* validateObosMembershipNumber


## Example usage with Zod

```js
import { z } from 'zod';
import { validatePhoneNumber } from '@obosbbl/validation/no';

const mobileOnlySchema = z.object({
  name: z.string(),
  phoneNumber: z
    .string()
    .refine(
      (val) => validatePhoneNumber(val, { mobileOnly: true }),
      'Telefonnummeret er ikke et gyldig mobilnummer',
    ),
});

const validData = {
  name: 'Kari Nordmann',
  phoneNumber: '92345678',
};

mobileOnlySchema.parse(validData); // => { name: 'Kari Nordmann', phoneNumber: '92345678' }

const invalidData = {
  name: 'Ola Nordmann',
  phoneNumber: '22865500',
}

mobileOnlySchema.parse(invalidData); // => throws ZodError
```
