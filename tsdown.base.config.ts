import type { UserConfig } from 'tsdown';

export const baseConfig: UserConfig = {
  // The published `exports` point at `.mjs` / `.d.mts` files, so keep those extensions
  fixedExtension: true,
  dts: true,
  // Lint package exports https://tsdown.dev/options/lint#publint
  publint: {
    enabled: 'ci-only',
    level: 'error',
  },
  // Lint ts declaration files https://tsdown.dev/options/lint#attw-are-the-types-wrong
  attw: {
    enabled: 'ci-only',
    profile: 'esm-only',
    level: 'error',
  },
};
