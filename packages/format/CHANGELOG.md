# @obosbbl/format

## 0.3.1

### Patch Changes

- 3a52b13: allow country code for phone number input in `formatPhoneNumber()`.

  Previously it was unable to format phone numbers with country codes (+47, +46), now it can.
  Note that the country code will _not_ be part of the formatted output.

  ```js
  // 🇳🇴 example
  formatPhoneNumber("+4700000000"); // => '00 00 00 00'

  // 🇸🇪 example
  formatPhoneNumber("+46303123456"); // => '0303-12 34 56'
  ```

## 0.3.0

### Minor Changes

- a92336d: add default entrypoint for formatting functions.

  This makes it easier to support both Norwegian and Swedish formatting in the same project,
  but it requires you to specify the wanted locale as an options argument to the method.

  Example:

  ```js
  // Combined 🇳🇴🇸🇪 example
  import { formatOrganizationNumber } from "@obosbbl/format";
  formatOrganizationNumber("000000000", { locale: "no" }); // => '000 000 000'
  formatOrganizationNumber("0000000000", { locale: "se" }); // => '000000-0000'

  // 🇳🇴 only example
  import { formatOrganizationNumber } from "@obosbbl/format/no";
  formatOrganizationNumber("000000000"); // => '000 000 000'

  // 🇸🇪 only example
  import { formatOrganizationNumber } from "@obosbbl/format/se";
  formatOrganizationNumber("0000000000"); // => '000000-0000'
  ```

## 0.2.0

### Minor Changes

- c856db7: add `formatPostalCode` method.

  ```js
  import { formatPostalCode } from "@obosbbl/format/no";

  formatPostalCode("0000"); // => '0000'

  import { formatPostalCode } from "@obosbbl/format/se";

  formatPhoneNumber("00000"); // => '000 00'
  ```

### Patch Changes

- 21a8fb3: add `keywords` to package.json

## 0.1.0

### Minor Changes

- a4938b2: initial release
