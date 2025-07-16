import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { InputStatus, KeyboardTypes, WebsiteUrlInputProps } from '../../types';

import Input from './input';
import { useWebsiteInputStyles } from './input.styles';

const WebsiteUrlInput: React.FC<WebsiteUrlInputProps> = ({
  label,
  url,
  onChangeText,
  onValidatedUrl,
  disabled = false,
  protocol,
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState<InputStatus>(InputStatus.DEFAULT);
  const finalProtocol = protocol ?? 'https://';

  const styles = useWebsiteInputStyles();

  const handleValidation = (
    value: any,
    status: InputStatus | ((prevState: InputStatus) => InputStatus),
  ) => {
    setStatus(status);
    if (status === InputStatus.SUCCESS) {
      const fullUrl = `${finalProtocol}${value.trim().toLowerCase()}`;
      onValidatedUrl?.(fullUrl);
    } else {
      onValidatedUrl?.(null);
    }
  };

  const getDividerColor = () => {
    if (isFocused && status === InputStatus.DEFAULT) {
      return theme.colors.primary[300];
    }
    if (status === InputStatus.ERROR) {
      return theme.colors.danger[500];
    }
    if (status === InputStatus.SUCCESS) {
      return theme.colors.success[500];
    }
    return theme.colors.secondary[200];
  };

  return (
    <Input
      disabled={disabled}
      value={url}
      onChangeText={text => {
        setStatus(InputStatus.DEFAULT);
        onChangeText?.(text);
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
      status={status}
      message={status === InputStatus.ERROR ? 'Enter a valid website URL' : ''}
      label={label}
      validationRegex={
        new RegExp(/^(www\.)?[a-zA-Z0-9.-]+\.[a-z]{2,6}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/)
      }
      onValidate={handleValidation}
    />
  );
};

export default WebsiteUrlInput;
