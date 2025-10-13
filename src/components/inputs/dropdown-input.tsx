import { useTheme } from 'native-base';
import React, { useState, useRef } from 'react';
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
  const [dropdownTop, setDropdownTop] = useState(0);
  const containerRef = useRef<View>(null);

  const styles = useDropdownInputStyles();
  const theme = useTheme();
  const options = React.Children.toArray(children); // convert children to array

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    if (disabled) {
      return;
    }

    // Measure container height to position dropdown below input
    if (!isDropdownVisible) {
      containerRef.current?.measure((x, y, width, height) => {
        setDropdownTop(height);
      });
    }

    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <View ref={containerRef} style={styles.wrapper}>
      {/* Label above input -> Eg: "Select an option" on the input field*/}
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

      {/* Input container that opens dropdown */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleDropdown}
        style={[
          styles.inputContainer,
          {
            borderColor: theme.colors.secondary[200],
            backgroundColor: disabled ? theme.colors.secondary[50] : theme.colors.white,
          },
        ]}
        disabled={disabled}
      >
        <Text
          style={[
            styles.inputText,
            { color: disabled ? theme.colors.secondary[500] : theme.colors.secondary[900] },
          ]}
        >
          {selectedValue || 'Select an option'}
        </Text>
        <Text style={styles.inputText}>
          <Icon name="angle-down" size={theme.sizes[6]} color={theme.colors.secondary[900]} />
        </Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.overlay}>
            <View style={[styles.dropdown, { top: dropdownTop }]}>
              <FlatList
                data={options}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                  if (React.isValidElement(item)) {
                    return (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                          onValueChange(item.props.value); // notify parent
                          setDropdownVisible(false); // close dropdown
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

      {/* Show simple success message */}
      {selectedValue && <Text style={styles.successMessage}>{`${selectedValue} is selected`}</Text>}
    </View>
  );
};

// Simple wrapper for each dropdown item; used as DropdownInput.Option
const DropdownOption: React.FC<DropdownOptionProps> = ({ children }) => {
  return <>{children}</>;
};

// Attach to DropdownInput so options can be used like <DropdownInput.Option>
DropdownInput.Option = DropdownOption;

export default DropdownInput;
