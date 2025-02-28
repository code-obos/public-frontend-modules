/** Strip all formatting, leaving only numbers and letters */
export function stripFormatting(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Used to validate Norwegian bank account numbers, organization numbers and national identity numbers.
 * See https://no.wikipedia.org/wiki/MOD11
 */
export function mod11(value: string, weights: number[]): boolean {
  // Since the control digit is a single value, the lengths should be equal
  if (weights.length + 1 !== value.length) {
    return false;
  }

  let sum = 0;
  weights.forEach((weight, index) => {
    sum += weight * Number(value[index]);
  });

  let controlNumber = 11 - (sum % 11);

  if (controlNumber === 11) {
    controlNumber = 0;
  }

  return controlNumber === Number(value[value.length - 1]);
}

/**
 * Also known as Luhn's algorithm.
 * Used to validate Swedish national identity numbers and Norwegian KID numbers
 *
 * See https://no.wikipedia.org/wiki/MOD10 and https://sv.wikipedia.org/wiki/Luhn-algoritmen#Kontroll_av_nummer
 */
export function mod10(value: string): boolean {
  let sum = 0;

  let weight = 1;
  // loop in reverse, starting with 1 as the weight for the last digit
  // which is control digit
  for (let i = value.length - 1; i >= 0; --i) {
    let number = Number(value[i]);

    number = weight * number;

    // if the number is greater than 9, ie more than one digit, we reduce it to a single digit by adding the individual digits together
    // 7 * 2 => 14 => 1 + 4 => 5
    // instead of adding the digits together, we can subtract 9 for the same result
    // 7 * 2 => 14 => 14 - 9 => 5
    if (number > 9) {
      number = number - 9;
    }

    sum += number;
    // alternate between 1 and 2 for the weight
    weight = weight === 1 ? 2 : 1;
  }

  return sum % 10 === 0;
}

export function isValidDate(year: number, month: number, day: number): boolean {
  // biome-ignore lint/style/noParameterAssign: months are zero index 🤷‍♂️
  month -= 1;

  // important to use UTC so the user's timezone doesn't affect the validation
  const date = new Date(Date.UTC(year, month, day));

  return (
    date &&
    // cannot do this for Norway
    // maybe do it for Sweden for long format?
    // date.getUTCFullYear() === year &&
    date.getUTCMonth() === month &&
    date.getUTCDate() === day
  );
}
