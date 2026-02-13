# React Native Template

Production-ready React Native boilerplate with TypeScript, navigation, state management, monitoring, and CI/CD pipelines.

## Quickstart

```sh
git clone git@github.com:jalantechnologies/react-native-template.git
cd react-native-template
corepack enable && corepack prepare yarn@3.6.4 --activate  # install yarn command
gem install bundler    # install bundle command (Ruby required)
yarn install          # install JS deps
bundle install        # iOS: Ruby gems
yarn pod-install      # iOS: install pods
yarn start            # start Metro (separate tab)
# create .env (see docs/environment.md for required keys)
yarn android              # or: yarn ios
```

## Documentation Directory

- [Setup](docs/setup.md) — clone, toolchain install order, first run verification
- [Environment](docs/environment.md) — env vars, Android SDK paths, Doppler injection
- [Architecture](docs/architecture.md) — data flow, navigation/state patterns, feature how-to
- [Customization](docs/customization.md) — rebrand/rename steps for Android & iOS
- [Project Package Naming & Flavoring](docs/project-package-naming.md) — Android package/flavor strategy; iOS pending (see issue)
- [Release Process](docs/release-process.md) — versioning, release notes, verification, rollback
- [Release Notes](docs/release_notes/) — required per-version notes for pipelines
- [Automation & Tooling](docs/automation.md) — workflow map, reusable actions, Fastlane lanes
- [CI](docs/ci.md) — GitHub Actions checks and SonarQube gate expectations
- [CD](docs/cd.md) — preview/production/permanent-preview deployment pipelines
- [Troubleshooting](docs/troubleshooting.md) — common local build fixes

## License

Private - Jalan Technologies
