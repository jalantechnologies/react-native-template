# Environment & Configuration

Use a `.env` file at the project root for runtime configuration. Values are loaded by the app via `src/config.ts`.

```env
ENVIRONMENT=development
API_BASE_URL=https://your-api.com/api
DD_APPLICATION_ID=your-datadog-app-id
DD_CLIENT_TOKEN=your-datadog-client-token
DD_SITE=US5
LOGGER=console
```

- Set `LOGGER=datadog` or `LOGGER=console,datadog` to enable Datadog logging.
- Keep secret values out of version control; rely on CI/CD secrets or your OS keychain where possible.

## Android SDK Environment

Add these to your shell rc so Android tooling works from the CLI:

```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

## Optional Build Overrides

| Variable | Default | When to change |
|----------|---------|----------------|
| `ANDROID_PREVIEW_FLAVOR` | `preview` | If you rename the preview flavor. |
| `ANDROID_PRODUCTION_FLAVOR` | `production` | If you rename the production flavor. |

## Doppler-Managed Secrets

CI/CD writes environment-specific `.env` files via the local action `.github/actions/inject_doppler_secrets`:
- Preview token: `DOPPLER_PREVIEW_TOKEN`
- Production token: `DOPPLER_PRODUCTION_TOKEN`

The action pulls secrets from Doppler (`react-native-template` project) and materializes them before builds so Android/iOS pipelines use the correct credentials and API endpoints. Keep these tokens in GitHub Secrets; never commit `.env`.
