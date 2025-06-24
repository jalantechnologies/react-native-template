import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { InputStatus, KeyboardTypes, WebsiteUrlInputProps } from '../../types';
import { useWebsiteInputStyles } from './input.styles';

const WebsiteUrlInput: React.FC<WebsiteUrlInputProps> = ({
  label = 'Website URL',
  url,
  onUrlChange,
  status = InputStatus.DEFAULT,
  errorMessage,
  successMessage,
  disabled = false,
  onValidate,
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const protocol = 'https://';

  const styles = useWebsiteInputStyles();

  const getBorderColor = () => {
    if (disabled) {
        return theme.colors.secondary[200];
    }
    if (status === InputStatus.ERROR) {
        return theme.colors.danger[500];
    }
    if (status === InputStatus.SUCCESS) {
        return theme.colors.success[500];
    }
    if (isFocused) {
        return theme.colors.primary[300];
    }
    return theme.colors.secondary[200];
  };

  const handleValidation = () => {
    const urlRegex = new RegExp(
        '((http|https)://)(www.)?' +
        '[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]' +
        '{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)'
    );

    const fullUrl = `${protocol}${url.trim()}`.toLowerCase();
    if (url.trim() === '' || !urlRegex.test(fullUrl)) {
      onValidate('', InputStatus.ERROR);
    } else {
      onValidate(fullUrl, InputStatus.SUCCESS);
    }
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.container,
          { backgroundColor: disabled ? theme.colors.secondary[100] : theme.colors.secondary[50] },
        ]}
      >
        {/* Protocol Section */}
        <View style={[styles.protocolContainer, { backgroundColor: theme.colors.secondary[50] }]}>
          <Text style={[styles.protocolText,{  color: disabled ? theme.colors.secondary[300] : theme.colors.black }]}>{protocol}</Text>
        </View>

        {/* URL Input */}
        <View style={[styles.inputContainer, { borderColor: getBorderColor() }]}>
          <TextInput
            style={[
              styles.inputField,
              { color: disabled ? theme.colors.secondary[500] : theme.colors.black },
            ]}
            value={url}
            onChangeText={onUrlChange}
            placeholder="Website URL"
            placeholderTextColor={theme.colors.secondary[400]}
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

      {status === InputStatus.ERROR && !!errorMessage && (
        <Text style={{ color: theme.colors.danger[500], fontSize: 12, marginTop: 4 }}>{errorMessage}</Text>
      )}

      {status === InputStatus.SUCCESS && !!successMessage && (
        <Text style={{ color: theme.colors.success[500], fontSize: 12, marginTop: 4 }}>{successMessage}</Text>
      )}
    </View>
  );
};

export default WebsiteUrlInput;
