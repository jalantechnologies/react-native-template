# Architecture Overview

This template ships with a pragmatic React Native stack tuned for production apps.

## Repository Structure (top level)

- [app code](../src/) — shared React Native codebase.
- [android](../android/) — native Android project and Gradle config; Fastlane at [android/fastlane](../android/fastlane/).
- [ios](../ios/) — native iOS project; Fastlane at [ios/fastlane](../ios/fastlane/).
- [docs](../docs/) — project documentation and release notes.
- [.github/workflows](../.github/workflows/) — CI/CD pipelines (PR checks, preview deploys, production, permanent preview, cleanup).
- [.github/actions](../.github/actions/) — reusable GitHub Action composites (Doppler secrets, release-notes check, deploy steps).
- [package.json](../package.json) / [.nvmrc](../.nvmrc) / [.tool-versions](../.tool-versions) — Node/toolchain versions and scripts.

## Project Layout

```
src/
├── components/     # Reusable UI components
├── screens/        # App screens (auth, dashboard, profile)
├── navigators/     # React Navigation setup
├── services/       # API client, auth, Datadog
├── contexts/       # React Context providers (auth, account, task)
├── types/          # TypeScript definitions
├── constants/      # App constants
├── utils/          # Hooks and utilities
├── translations/   # i18n resources
├── logger/         # Logging (console, Datadog)
├── config.ts       # Environment config wrapper
└── app.tsx         # App entry point
```

## Key Libraries

| Library | Purpose |
|---------|---------|
| React Navigation | Screen navigation |
| NativeBase | UI components |
| Formik + Yup | Form handling & validation |
| Axios | HTTP client |
| AsyncStorage | Local storage |
| Datadog RUM | Monitoring & analytics |
| i18next | Internationalization |
| React Native Reanimated | Animations |
