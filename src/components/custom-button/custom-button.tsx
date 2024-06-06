import { Button } from '@rneui/themed';
import React from 'react';

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
    />
  );
};

CustomButton.defaultProps = {
  disabled: false,
  loading: false,
};

export default CustomButton;
