import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const ButtonContainer = TouchableOpacity;

interface TailwindButtonProps extends TouchableOpacityProps {
  loading?: boolean;
  title: string;
  variant?: 'primary' | 'secondary';
}

const TailwindButton: React.FC<TailwindButtonProps> = ({
  loading,
  title,
  variant = 'primary',
  ...props
}) => {
  const buttonStyle = [
    'px-2.5',
    'py-1.5',
    'rounded-md',
    'items-center',
    variant === 'primary'
      ? 'bg-primary-light dark:bg-primary-dark'
      : 'bg-secondary-light dark:bg-secondary-dark',
    loading || props.disabled ? 'opacity-50' : '',
  ].join(' ');

  const textStyle = [
    'text-lg',
    props.disabled ? 'text-slate-300' : 'text-white',
    'dark:text-slate-900',
  ].join(' ');

  return (
    <ButtonContainer className={buttonStyle} {...props}>
      {loading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <Text className={textStyle}>{title}</Text>
      )}
    </ButtonContainer>
  );
};

TailwindButton.defaultProps = {
  loading: false,
  variant: 'primary',
};

export default TailwindButton;
