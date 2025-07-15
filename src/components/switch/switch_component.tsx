import { useTheme } from 'native-base';
import React from 'react';
import { Pressable, Text, Animated } from 'react-native';

import CircularLoader from './CircularLoader';

export interface SwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  labelType?: 'text' | 'icon' | 'none';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const SwitchComponent: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  variant = 'primary',
  labelType = 'none',
  size = 'md',
  loading = false,
}) => {
  const theme = useTheme();

  const [internalValue, setInternalValue] = React.useState(value);
  const [isLoading, setIsLoading] = React.useState(false);
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  const sizeConfig = {
    sm: { width: 44, height: 24, thumb: 20, labelSize: 10, padding: 2 },
    md: { width: 54, height: 28, thumb: 24, labelSize: 12, padding: 2 },
    lg: { width: 64, height: 32, thumb: 28, labelSize: 13, padding: 2 },
  }[size];

  const colorSet = {
    active: theme.colors[variant][500],
    inactive: theme.colors.secondary[200],
  };

  const getLabel = () => {
    if (size === 'sm' && labelType === 'text') return '';
    if (labelType === 'text') return internalValue ? 'ON' : 'OFF';
    if (labelType === 'icon') return internalValue ? '✓' : '✕';
    return '';
  };

  const getLabelColor = () => {
    if (labelType === 'icon' && internalValue) return theme.colors.black;
    return theme.colors.white;
  };

  const getThumbColor = () => {
    return disabled ? theme.colors.secondary[100] : theme.colors.white;
  };

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [sizeConfig.padding, sizeConfig.width - sizeConfig.thumb - sizeConfig.padding],
  });

  const backgroundColorAnimated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colorSet.inactive, colorSet.active],
  });

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: internalValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [internalValue]);

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleToggle = () => {
    if (disabled || isLoading) return;

    if (loading) {
      setIsLoading(true);
      setTimeout(() => {
        const newValue = !internalValue;
        setInternalValue(newValue);
        setIsLoading(false);
        onValueChange(newValue);
      }, 1000);
    } else {
      const newValue = !internalValue;
      setInternalValue(newValue);
      onValueChange(newValue);
    }
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handleToggle}
      accessibilityRole="button"
      style={{
        width: sizeConfig.width,
        height: sizeConfig.height,
        borderRadius: sizeConfig.height / 2,
        opacity: disabled ? 0.5 : 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Animated.View
        style={{
          width: sizeConfig.width,
          height: sizeConfig.height,
          borderRadius: sizeConfig.height / 2,
          backgroundColor: disabled
            ? internalValue
              ? theme.colors.secondary[400]
              : theme.colors.secondary[200]
            : backgroundColorAnimated,
          position: 'absolute',
        }}
      />

      <Animated.View
        style={{
          width: sizeConfig.thumb,
          height: sizeConfig.thumb,
          borderRadius: sizeConfig.thumb / 2,
          backgroundColor: getThumbColor(),
          position: 'absolute',
          left: thumbTranslateX,
          top: sizeConfig.padding,
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoading && (
          <CircularLoader
            size={sizeConfig.thumb * 0.6}
            color={colorSet.active}
            strokeWidth={2}
            backgroundColor={theme.colors.secondary[200]}
          />
        )}
      </Animated.View>

      {labelType !== 'none' && getLabel() !== '' && !isLoading && (
        <Text
          style={{
            color: getLabelColor(),
            fontSize: sizeConfig.labelSize,
            fontWeight: '600',
            position: 'absolute',
            left: internalValue ? 6 : undefined,
            right: internalValue ? undefined : 6,
          }}
        >
          {getLabel()}
        </Text>
      )}
    </Pressable>
  );
};

SwitchComponent.defaultProps = {
  disabled: false,
  variant: 'primary',
  labelType: 'none',
  size: 'md',
  loading: false,
};

export default SwitchComponent;
