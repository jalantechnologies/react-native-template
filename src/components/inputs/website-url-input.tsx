import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { InputStatus, KeyboardTypes, WebsiteUrlInputProps } from '../../types';

import Input from './input';
import { useWebsiteInputStyles } from './input.styles';

const WebsiteUrlInput: React.FC<WebsiteUrlInputProps> = ({
  label,
  url,
  onUrlChange,
  status,
  errorMessage,
  successMessage,
  disabled = false,
  onValidate,
  protocol,
}) => {
  const theme = useTheme();
  const [localStatus, setLocalStatus] = useState<InputStatus>(InputStatus.DEFAULT);
  const [localErrorMessage, setLocalErrorMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const finalProtocol = protocol ?? 'https://';

  const styles = useWebsiteInputStyles();

  const currentStatus = status ?? localStatus;
  const currentErrorMessage = status !== undefined ? errorMessage : localErrorMessage;

  const resetValidation = () => {
    if (status === undefined) {
      setLocalStatus(InputStatus.DEFAULT);
      setLocalErrorMessage('');
    }
  };

  const handleValidation = (
    value: any,
    status: InputStatus | ((prevState: InputStatus) => InputStatus),
  ) => {
    if (status === InputStatus.ERROR) {
      setLocalStatus(InputStatus.ERROR);
      setLocalErrorMessage('Enter a valid website URL');
    } else {
      const fullUrl = `${finalProtocol}${value.trim().toLowerCase()}`;
      setLocalStatus(InputStatus.SUCCESS);
      setLocalErrorMessage('');
      onValidate?.(fullUrl, InputStatus.SUCCESS);
    }
  };

  const getDividerColor = () => {
    if (isFocused && currentStatus === InputStatus.DEFAULT) {
      return theme.colors.primary[300];
    }
    if (currentStatus === InputStatus.ERROR) {
      return theme.colors.danger[500];
    }
    if (currentStatus === InputStatus.SUCCESS) {
      return theme.colors.success[500];
    }
    return theme.colors.secondary[200];
  };

  return (
    <Input
      disabled={disabled}
      value={url}
      onChangeText={text => {
        resetValidation();
        onUrlChange?.(text);
      }}
      keyboardType={KeyboardTypes.URL}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      startEnhancer={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              styles.text,
              {
                color: disabled ? theme.colors.secondary[500] : theme.colors.secondary[900],
              },
            ]}
          >
            {finalProtocol}
          </Text>
          <View style={[styles.divider, { backgroundColor: getDividerColor() }]} />
        </View>
      }
      placeholder="Website URL"
      placeholderTextColor={disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]}
      status={currentStatus}
      message={
        currentStatus === InputStatus.ERROR
          ? currentErrorMessage
          : currentStatus === InputStatus.SUCCESS
          ? successMessage
          : ''
      }
      label={label}
      validationRegex={
        new RegExp(/^(www\.)?[a-zA-Z0-9.-]+\.[a-z]{2,6}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/)
      }
      onValidate={handleValidation}
    />
  );
};

export default WebsiteUrlInput;
