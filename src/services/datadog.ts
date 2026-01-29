import {
  DatadogProviderConfiguration,
  LogsConfiguration,
  RumConfiguration,
  TrackingConsent,
} from '@datadog/mobile-react-native';
import {
  ImagePrivacyLevel,
  SessionReplay,
  TextAndInputPrivacyLevel,
  TouchPrivacyLevel,
} from '@datadog/mobile-react-native-session-replay';
import Config from 'react-native-config';

const rumConfig = new RumConfiguration(
  Config.DD_APPLICATION_ID || '',
  true, // track interactions
  true, // track resources
  true, // track errors
  {
    nativeCrashReportEnabled: true,
    sessionSampleRate: 100,
  },
);

const logsConfig = new LogsConfiguration();

const DatadogConfig = new DatadogProviderConfiguration(
  Config.DD_CLIENT_TOKEN || '',
  Config.DD_ENVIRONMENT_NAME || 'development',
  TrackingConsent.GRANTED,
  {
    site: 'US5',
    rumConfiguration: rumConfig,
    logsConfiguration: logsConfig,
  },
);

export const onDataDogSDKInitialized = async () => {
  await SessionReplay.enable({
    replaySampleRate: 20,
    textAndInputPrivacyLevel: TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS,
    imagePrivacyLevel: ImagePrivacyLevel.MASK_NONE,
    touchPrivacyLevel: TouchPrivacyLevel.SHOW,
  });
};

export default DatadogConfig;
