import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

import { DropdownInputProps, DropdownOptionProps } from '../../types';

import { useDropdownInputStyles } from './input.styles';

const DropdownInput: React.FC<DropdownInputProps> & {
  Option: React.FC<DropdownOptionProps>;
} = ({ children, disabled = false, label, onValueChange, selectedValue }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownStyles = useDropdownInputStyles();
  const theme = useTheme();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionSelect = (value: string) => {
    onValueChange(value);
    setDropdownVisible(false);
  };

  const textColor = disabled ? theme.colors.secondary[500] : theme.colors.secondary[900];
  const backgroundColor = disabled ? theme.colors.secondary[50] : theme.colors.white;

  return (
    <View style={dropdownStyles.wrapper}>
      {label && <Text style={[dropdownStyles.label, { color: textColor }]}>{label}</Text>}

      <View style={dropdownStyles.container}>
        <TouchableOpacity
          activeOpacity={dropdownStyles.touchableOpacity}
          disabled={disabled}
          onPress={toggleDropdown}
          style={[
            dropdownStyles.inputContainer,
            { backgroundColor, borderColor: theme.colors.secondary[200] },
          ]}
        >
          <Text style={[dropdownStyles.inputText, { color: textColor }]}>
            {selectedValue || 'Select an option'}
          </Text>
          {/* Type casting added because react-native-vector-icons has compatibility issues with React types */}
          {React.createElement(Icon as unknown as React.ComponentType<any>, {
            color: theme.colors.secondary[900],
            name: isDropdownVisible ? 'chevron-up' : 'chevron-down',
            size: Number(theme.sizes[6]),
          })}
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={dropdownStyles.dropdown}>
            <FlatList
              // Makes sure each option has a value before rendering
              data={React.Children.toArray(children)}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) =>
                React.isValidElement<DropdownOptionProps>(item) ? (
                  <TouchableOpacity
                    onPress={() => handleOptionSelect(item.props.value)}
                    style={dropdownStyles.option}
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
