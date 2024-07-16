import { DatadogProviderConfiguration } from '@datadog/mobile-react-native';
import Config from 'react-native-config';

const DatadogConfig = new DatadogProviderConfiguration(
  Config.DD_CLIENT_TOKEN || '',
  Config.DD_ENVIRONMENT_NAME || 'development',
  Config.DD_APPLICATION_ID || '',
  true, // track User interactions (e.g.: Tap on buttons. You can use 'accessibilityLabel' element property to give tap action the name, otherwise element type will be reported)
  true, // track XHR Resources
  true, // track Errors
);

// Optional: Select your Datadog website (one of "US1", "EU1", "US3", "US5", "AP1" or "GOV")
DatadogConfig.site = 'US5';

// Optional: Enable JavaScript long task collection
// DatadogConfig.longTaskThresholdMs = 100

// Optional: enable or disable native crash reports
DatadogConfig.nativeCrashReportEnabled = true;

// Optional: sample RUM sessions (here, 100% of session will be sent to Datadog. Default = 100%)
// DatadogConfig.sampleRate = 100

export default DatadogConfig;
