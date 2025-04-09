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

The methods are "strict" by default, meaning no formatting characters in the input is allowed. This even applies to separators such as in Swedish national identity numbers.

When doing server-side validation, for instance, before insertion into a database, strictness is often preferrable. The value is often expected to be a "clean" value in standardized format.

On the client side, formatting characters could be allowed, as they are more user-friendly, for instance, allowing the user to input their phone number in their preferred format.

If you want to allow formatting characters in the value, you can pass `allowFormatting: true` in the options object to the method.


```js
import { validateOrganizationNumber } from '@obosbbl/validation/no';

validateOrganizationNumber('937052766') // true

// formatting characters disallowed by default
validateOrganizationNumber('937 052 766') // false;

// allow formatting characters
validateOrganizationNumber('937 052 766', { allowFormatting: true }) // true;
```

## Methods

### validateNationalIdentityNumber()

Validates that the value is a valid national identity number.

Validation is done for the both checksum and if the date is a valid date.
It accepts both fødselsnummer and d-nummer for Norway, and personnummer and samordningsnummer for Sweden.

By default, both the short (10 digit) and long (12 digit) format is allowed for Sweden. You can use the `format` option to specify the format to validate.

```js
// 🇳🇴 example
import { validateNationalIdenityNumber } from '@obosbbl/validation/no';
validateNationalIdenityNumber('DDMMYYXXXX') // => true

// 🇸🇪 example
import { validateNationalIdentityNumber } from "@obosbbl/validation/se";
// short
validatePersonalIdentityNumber('YYMMDDXXXX') // => true
// long
validateOrganizationNumber('YYYYMMDDXXXX'') // => true

// separator (formatting) is important for Swedish national identity numbers
validatePersonalIdentityNumber('YYMMDD-XXXX', { allowFormatting: true }) // => true
validateOrganizationNumber('YYYY-MMDDXXXX', { allowFormatting: true })) // => true

// specific format
validatePersonalIdentityNumber('YYMMDDXXXX', { format: 'short' }) // => true
validatePersonalIdentityNumber('YYMMDDXXXX', { format: 'long' }) // => false

validatePersonalIdentityNumber('YYYYMMDDXXXX', { format: 'long' }) // => true
```

> [!TIP]
> Did you know that you cannot assume that the date in the number is person's date of birth? See [Skatteetaten fødselsnummer](https://www.skatteetaten.no/person/folkeregister/identitetsnummer/fodselsnummer/).

### validatePhoneNumber()

Validates that the value is a valid phone number. Specify `mobileOnly` to only allow mobile numbers.

```js
// 🇳🇴 example
import { validatePhoneNumber } from '@obosbbl/validation/no';
validatePhoneNumber('00000000') // => true
validatePhoneNumber('90000000', { mobileOnly: true }) // => true

// 🇸🇪 example
import { validatePhoneNumber } from '@obosbbl/validation/se';
validatePhoneNumber('00000000') // => true
validatePhoneNumber('000000000') // => true
validatePhoneNumber('0000000000') // => true
validatePhoneNumber('0700000000', { mobileOnly: true }) // => true
```

### validatePostalCode()

Validates that the value is a valid postal code.

```js
// 🇳🇴 example
import { validatePostalCode } from '@obosbbl/validation/no';
validatePostalCode('0000') // => true

// 🇸🇪 example
import { validatePostalCode } from '@obosbbl/validation/se';
validatePostalCode('00000') // => true
```

### validateOrganizationNumber()

Validates that the value is a valid organization number. Validates the checksum of the number.

```js
// 🇳🇴 example
import { validateOrganizationNumber } from '@obosbbl/validation/no';
validateOrganizationNumber('937052766') // => true

// 🇸🇪 example
import { validateOrganizationNumber } from '@obosbbl/validation/se';
validateOrganizationNumber('5592221054') // => true
```

### validateObosMembershipNumber()

Validates that the value is a valid OBOS membership number.

> [!NOTE]
> There is no difference between a Norwegian and Swedish OBOS membership number. The method in use is in fact the same one, re-exported for the different locales.

```js
// 🇳🇴 example
import { validateObosMembershipNumber } from '@obosbbl/validation/no';
validateObosMembershipNumber('0000000') // => true

// 🇸🇪 example
import { validateObosMembershipNumber } from '@obosbbl/validation/se';
validateObosMembershipNumber('0000000') // => true
```

### validateBankAccountNumber()

Validates that the value is a valid organization number. Validates the checksum of the number.

```js
// 🇳🇴 example
import { validateBankAccountNumber } from '@obosbbl/validation/no';
validateBankAccountNumber('12345678903'); // => true

// 🇸🇪 example
// TODO: implement
```


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
