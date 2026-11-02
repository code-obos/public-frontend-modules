import { defineConfig } from 'tsdown';

import { baseConfig } from '../../tsdown.base.config.ts';

export default defineConfig({
  ...baseConfig,
  entry: ['src/no.ts', 'src/se.ts'],
});
