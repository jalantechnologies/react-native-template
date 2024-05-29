import { Button } from '@rneui/themed';
import React from 'react';
import { useTailwind } from '../../utils/tailwind-util';

interface CustomButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  disabled,
  loading,
  title,
}: CustomButtonProps) => {
  return (
    <Button
      onPress={onPress}
      disabled={disabled}
      title={title}
      loading={loading}
      containerStyle={useTailwind('mt-2.5 rounded-lg')}
      buttonStyle={useTailwind('bg-primary min-w-24 rounded-lg')}
    />
  );
};

CustomButton.defaultProps = {
  disabled: false,
  loading: false,
};

export default CustomButton;
