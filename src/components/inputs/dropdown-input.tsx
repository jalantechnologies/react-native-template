import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { DropdownInputProps, DropdownOptionProps } from '../../types';

import { useDropdownInputStyles } from './input.styles';

const DropdownInput: React.FC<DropdownInputProps> & {
  Option: React.FC<DropdownOptionProps>;
} = ({ label, selectedValue, onValueChange, disabled = false, children }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownStyles = useDropdownInputStyles();
  const theme = useTheme();

  const toggleDropdown = () => {
    if (!disabled) {
      setDropdownVisible(!isDropdownVisible);
    }
  };

  const handleOptionSelect = (value: string) => {
    onValueChange(value);
    setDropdownVisible(false);
  };

  const inputTextColor = disabled ? theme.colors.secondary[500] : theme.colors.secondary[900];
  const inputBgColor = disabled ? theme.colors.secondary[50] : theme.colors.white;

  return (
    <View style={dropdownStyles.wrapper}>
      {label && <Text style={[dropdownStyles.label, { color: inputTextColor }]}>{label}</Text>}

      <View style={dropdownStyles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={toggleDropdown}
          style={[
            dropdownStyles.inputContainer,
            { borderColor: theme.colors.secondary[200], backgroundColor: inputBgColor },
          ]}
          disabled={disabled}
        >
          <Text style={[dropdownStyles.inputText, { color: inputTextColor }]}>
            {selectedValue || 'Select an option'}
          </Text>
          <Icon
            name={isDropdownVisible ? 'angle-up' : 'angle-down'}
            size={theme.sizes[6]}
            color={theme.colors.secondary[900]}
          />
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={dropdownStyles.dropdown}>
            <FlatList
              // Makes sure each option has a value before rendering
              data={React.Children.toArray(children)}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) =>
                React.isValidElement(item) ? (
                  <TouchableOpacity
                    style={dropdownStyles.option}
                    onPress={() => handleOptionSelect(item.props.value)}
                  >
                    {item.props.children}
                  </TouchableOpacity>
                ) : null
              }
            />
          </View>
        )}
      </View>

      {selectedValue && (
        <Text style={dropdownStyles.successMessage}>{`${selectedValue} selected`}</Text>
      )}
    </View>
  );
};

// Subcomponent needed to give each dropdown option a value
// Allows using <DropdownInput.Option value="x">Label</DropdownInput.Option>
const DropdownOption: React.FC<DropdownOptionProps> = ({ children }) => <>{children}</>;

DropdownInput.Option = DropdownOption;
export default DropdownInput;
