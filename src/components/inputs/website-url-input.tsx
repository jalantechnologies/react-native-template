import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { InputStatus, KeyboardTypes, WebsiteUrlInputProps } from '../../types';

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
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [localStatus, setLocalStatus] = useState<InputStatus>(InputStatus.DEFAULT);
  const [localErrorMessage, setLocalErrorMessage] = useState('');
  const protocol = 'https://';

  const styles = useWebsiteInputStyles();

  const getBorderColor = () => {
    if (currentStatus === InputStatus.ERROR) {
      return theme.colors.danger[500];
    }
    if (isFocused) {
      return theme.colors.primary[300];
    }
    return theme.colors.secondary[200];
  };

  const currentStatus = status !== undefined ? status : localStatus;
  const currentErrorMessage = status !== undefined ? errorMessage : localErrorMessage;

  const resetValidation = () => {
    if (status === undefined) {
      setLocalStatus(InputStatus.DEFAULT);
      setLocalErrorMessage('');
    }
  };

  const handleValidation = () => {
    const urlRegex = new RegExp(
      '((http|https)://)(www.)?' +
        '[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]' +
        '{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)',
    );

    const fullUrl = `${protocol}${url.trim()}`.toLowerCase();

    if (url.trim() === '' || !urlRegex.test(fullUrl)) {
      if (status === undefined) {
        setLocalStatus(InputStatus.ERROR);
        setLocalErrorMessage('Enter a valid website URL');
      }
      onValidate?.('', InputStatus.ERROR);
    } else {
      if (status === undefined) {
        setLocalStatus(InputStatus.SUCCESS);
      }
      onValidate?.(fullUrl, InputStatus.SUCCESS);
    }
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: disabled ? theme.colors.secondary[500] : theme.colors.secondary[900] },
          ]}
        >
          {label}
        </Text>
      )}

      <View style={styles.container}>
        <View style={styles.protocolContainer}>
          <Text
            style={[
              styles.text,
              { color: disabled ? theme.colors.secondary[300] : theme.colors.secondary[900] },
            ]}
          >
            {protocol}
          </Text>
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              borderColor: getBorderColor(),
              backgroundColor: disabled ? theme.colors.secondary[50] : theme.colors.white,
            },
          ]}
        >
          <TextInput
            style={[
              styles.text,
              {
                color: disabled
                  ? theme.colors.secondary[500]
                  : currentStatus === InputStatus.ERROR
                  ? theme.colors.danger[800]
                  : theme.colors.secondary[900],
              },
            ]}
            value={url}
            onChangeText={text => {
              resetValidation();
              onUrlChange(text);
            }}
            placeholder="Website URL"
            placeholderTextColor={
              disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]
            }
            keyboardType={KeyboardTypes.URL}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              handleValidation();
            }}
          />
        </View>
      </View>

      {currentStatus === InputStatus.ERROR && !!currentErrorMessage && (
        <Text style={[styles.message, { color: theme.colors.danger[500] }]}>
          {currentErrorMessage}
        </Text>
      )}

      {currentStatus === InputStatus.SUCCESS && !!successMessage && (
        <Text style={[styles.message, { color: theme.colors.success[500] }]}>{successMessage}</Text>
      )}
    </View>
  );
};

export default WebsiteUrlInput;
