import { useTheme } from 'native-base';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  LayoutRectangle,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { DropdownInputProps, DropdownOptionProps, InputStatus } from '../../types';

import { useDropdownInputStyles } from './input.styles';

const DropdownInput: React.FC<DropdownInputProps> & { Option: React.FC<DropdownOptionProps> } = ({
  label,
  value,
  onValueChange,
  status = InputStatus.DEFAULT,
  errorMessage,
  successMessage,
  disabled = false,
  children,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const containerRef = useRef<View>(null);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const styles = useDropdownInputStyles();
  const theme = useTheme();
  const options = React.Children.toArray(children);

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
    return theme.colors.secondary[200];
  };

  return (
    <View ref={containerRef} onLayout={({ nativeEvent }) => setLayout(nativeEvent.layout)}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => !disabled && setDropdownVisible(!isDropdownVisible)}
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: disabled ? theme.colors.secondary[100] : theme.colors.secondary[50],
          },
        ]}
        disabled={disabled}
      >
        <Text
          style={[
            styles.inputText,
            { color: disabled ? theme.colors.secondary[500] : theme.colors.black },
          ]}
        >
          {value || 'Select an option'}
        </Text>
        <Text style={styles.dropdownIcon}>
          <Icon name="angle-down" size={24} color={theme.colors.secondary[900]} />
        </Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.overlay}>
            <View style={[styles.dropdown, { top: (layout?.height || 50) + 4 }]}>
              <FlatList
                data={options}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                  if (React.isValidElement(item)) {
                    return (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                          onValueChange(item.props.value);
                          setDropdownVisible(false);
                        }}
                      >
                        {item.props.children}
                      </TouchableOpacity>
                    );
                  }
                  return null;
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}

      {status === 'error' && !!errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}

      {status === 'success' && !!successMessage && (
        <Text style={styles.successMessage}>{successMessage}</Text>
      )}
    </View>
  );
};

const DropdownOption: React.FC<DropdownOptionProps> = ({ children }) => {
  return <>{children}</>;
};

DropdownInput.Option = DropdownOption;

export default DropdownInput;
