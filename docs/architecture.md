# Architecture & How-To Guide

This template ships with a pragmatic React Native stack tuned for production apps. Use this page to understand how the pieces fit together and how to add features safely.

## Repository Structure (top level)

- [src/](../src/) — shared React Native codebase (screens, navigation, services, contexts, components).
- [android/](../android/) — native Android project and Gradle config; Fastlane at [android/fastlane](../android/fastlane/).
- [ios/](../ios/) — native iOS project; Fastlane at [ios/fastlane](../ios/fastlane/).
- [docs/](../docs/) — project documentation and release notes.
- [.github/workflows/](../.github/workflows/) — CI/CD pipelines (PR checks, preview deploys, production, permanent preview, cleanup).
- [.github/actions/](../.github/actions/) — reusable GitHub Action composites (Doppler secrets, release-notes check, deploy steps).
- [package.json](../package.json) / [.nvmrc](../.nvmrc) / [.tool-versions](../.tool-versions) — toolchain versions and scripts.

## App Layout (src/)

```
src/
├── app.tsx               # App entry; registers providers and navigation container
├── navigators/           # React Navigation stacks/tabs
├── screens/              # Feature screens
├── components/           # Reusable UI components
├── services/             # API client, auth, Datadog, domain services
├── contexts/             # React Context providers (auth, account, task, etc.)
├── types/                # TypeScript types
├── constants/            # App constants
├── utils/                # Hooks and utilities
├── translations/         # i18n resources
├── logger/               # Logging (console, Datadog)
└── config.ts             # Environment config wrapper
```

## Data & Control Flow

Screen → (optional) Formik form → Context (state) → Service (API) → Backend.
Navigation is defined in `navigators/`; screens consume contexts/hooks and call services for side effects.

## Navigation

- React Navigation drives stacks/tabs. Entry point: [`src/app.tsx`](../src/app.tsx).
- Register new screens in the relevant navigator under [`src/navigators/`](../src/navigators/).
- Keep route names/constants collocated; use typed params for routes.

## State Management

- Contexts live in [`src/contexts/`](../src/contexts/). Existing contexts: auth, account, task (inspect files there).
- Create a new context when state is shared across multiple screens; colocate types in [`src/types/`](../src/types/).
- Provide contexts high in the tree (see providers in `app.tsx`).

## Forms

- Standard pattern: Formik + Yup. Define `initialValues`, `validationSchema`, and `onSubmit` that calls a service.
- Reuse UI inputs/buttons from [`src/components/`](../src/components/); keep schemas near the form or shared if reused.

## Services & API Calls

- HTTP is wrapped under [`src/services/`](../src/services/); Axios instance is configured there.
- Adding an API:
  1. Define request/response types in [`src/types/`](../src/types/).
  2. Implement the call in a service file in `services/` (or create a new one).
  3. Consume from contexts or screens; keep side effects in services/contexts, not components.

## Adding a Feature (happy path checklist)

1. **Data contracts:** Add/extend types in `src/types/`.
2. **Service call:** Implement API functions in `src/services/` using the shared client.
3. **State:** If shared, add/extend a context in `src/contexts/` and wire the provider in `src/app.tsx`.
4. **UI:** Add a screen in `src/screens/`; reuse `components/` where possible.
5. **Navigation:** Register the screen in a navigator in `src/navigators/`; add typed route params.
6. **Forms (if any):** Use Formik + Yup; keep schemas close to the screen or shared.
7. **Strings:** Add copy to `src/translations/` instead of hardcoding.
8. **Telemetry:** Use `src/logger/` for logging/Datadog where helpful.
9. **Tests:** Add/adjust tests (Jest) when changing logic.

## Coding Conventions

- **TypeScript first:** Prefer explicit types; keep DTOs in `src/types/`.
- **Components:** Keep presentational vs. container separation light; reuse `components/` before adding new ones.
- **Naming:** camelCase for vars/functions, PascalCase for components, SCREAMING_SNAKE for constants.
- **Side effects:** Keep network/storage in `services/` or `contexts/`; avoid in components.
- **Navigation params:** Type your route params; avoid `any`.
- **Styles:** Follow existing pattern (StyleSheet/styled utilities as used in repo).
- **i18n:** No hardcoded user-facing strings; add to `src/translations/`.
- **Lint/type:** Run `yarn lint` and `yarn type-check` before PRs.

## Review & PR Expectations

- Version bump + `docs/release_notes/{version}.md` required (CI gate).
- Keep PRs scoped; include tests where feasible.
- Verify both platforms when touching shared logic; note platform-specific impacts in the PR description, follow the PR template given at [`.github/pull_request_template.md`](../.github/pull_request_template.md)
- Link related issues/tickets and call out follow-ups.
