# OBOS public frontend modules

This a monorepo of OBOS' open source frontend modules.


## Packages

* [format](./packages/format) - A collection of formatting methods for 🇳🇴 and 🇸🇪.
* [validation](./packages/validation) - A collection of validation methods for 🇳🇴 and 🇸🇪.

## Contributing

### Setup pnpm

See the [pnpm installation guide](https://pnpm.io/installation).

```
pnpm install
```

### Linting

This repository uses [biome](https://biomejs.dev/) for linting.

### Build

```
pnpm build
```

### File naming convention

- Use kebab-case for file names. This is enforced at a linter level.

### Releases and changelogs

We use an automated release process based on [changesets](https://github.com/changesets/changesets) and a [Github action](./.github/workflows/release.yml) to version, release and publish the packages. Meaningful changes should be documented by running `pnpm changeset` and be a part of the pull request. Remember to follow semver.
