import { defaultNS } from '../src/translations';
import * as resources from '../src/translations/resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}
