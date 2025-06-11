import { Appearance, ColorSchemeName } from 'react-native';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

import { AlertOptions, AlertType } from './alert.types';

const alertTypeMap: Record<AlertType, ALERT_TYPE> = {
  SUCCESS: ALERT_TYPE.SUCCESS,
  DANGER: ALERT_TYPE.DANGER,
  WARNING: ALERT_TYPE.WARNING,
  INFO: ALERT_TYPE.INFO,
};

export const checkTheme = (): 'light' | 'dark' => {
  const theme: ColorSchemeName = Appearance.getColorScheme();
  return theme === 'dark' ? 'light' : 'dark';
};

export const showAlertDialog = ({ type = AlertType.INFO, title, content, confirmText }: AlertOptions) => {
  Dialog.show({
    type: alertTypeMap[type],
    title: title,
    textBody: content,
    button: confirmText,
    autoClose: confirmText ? false : 2000,
    closeOnOverlayTap: confirmText ? false : true,
  });
};

export const showAlertToast = ({ type = AlertType.INFO, title, content }: AlertOptions) => {
  Toast.show({
    type: alertTypeMap[type],
    title: title,
    textBody: content,
    autoClose: 2000,
  });
};
