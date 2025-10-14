import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { DropdownInputProps, DropdownOptionProps } from '../../types';
import { useDropdownInputStyles } from './input.styles';

const DropdownInput: React.FC<DropdownInputProps> & { Option: React.FC<DropdownOptionProps> } = ({
  label,
  selectedValue,
  onValueChange,
  disabled = false,
  children,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dropdownStyles = useDropdownInputStyles();
  const theme = useTheme();

  const handleDropDownVisibility = () => {
    if (!disabled) {
      setDropdownVisible(!isDropdownVisible);
    }
  };

  const selectOption = (value: string) => {
    onValueChange(value);
    setDropdownVisible(false);
  };

  return (
    <View style={dropdownStyles.wrapper}>
      {label && (
        <Text
          style={[
            dropdownStyles.label,
            { color: disabled ? theme.colors.secondary[500] : theme.colors.secondary[900] },
          ]}
        >
          {label}
        </Text>
      )}

      <View style={{ position: 'relative' }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleDropDownVisibility}
          style={[
            dropdownStyles.inputContainer,
            {
              borderColor: theme.colors.secondary[200],
              backgroundColor: disabled ? theme.colors.secondary[50] : theme.colors.white,
            },
          ]}
          disabled={disabled}
        >
          <Text
            style={[
              dropdownStyles.inputText,
              { color: disabled ? theme.colors.secondary[500] : theme.colors.secondary[900] },
            ]}
          >
            {selectedValue || 'Select an option'}
          </Text>
          <Icon name="angle-down" size={theme.sizes[6]} color={theme.colors.secondary[900]} />
        </TouchableOpacity>

        {isDropdownVisible && (
          <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
            <View style={dropdownStyles.overlay}>
              <View style={dropdownStyles.dropdown}>
                <FlatList
                  data={React.Children.toArray(children)}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) =>
                    React.isValidElement(item) ? (
                      <TouchableOpacity
                        style={dropdownStyles.option}
                        onPress={() => selectOption(item.props.value)}
                      >
                        {item.props.children}
                      </TouchableOpacity>
                    ) : null
                  }
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
      {selectedValue && <Text style={dropdownStyles.successMessage}>{`${selectedValue} is selected`}</Text>}
    </View>
  );
};

const DropdownOption: React.FC<DropdownOptionProps> = ({ children }) => <>{children}</>;

DropdownInput.Option = DropdownOption;
export default DropdownInput;
