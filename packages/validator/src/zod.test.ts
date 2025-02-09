import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { validatePhoneNumber } from './no';

test('it integrates with zod', () => {
  const schema = z.object({
    name: z.string(),
    phoneNumber: z
      .string()
      .refine(
        (val) => validatePhoneNumber(val, { mobileOnly: true }),
        'Ugyldig telefonnummer',
      ),
  });

  const data = {
    name: 'Kari Nordmann',
    phoneNumber: '92345678',
  };

  expect(schema.parse(data)).toEqual(data);
});
