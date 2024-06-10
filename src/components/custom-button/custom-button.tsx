import { Button } from '@rneui/themed';
import React from 'react';
import tw from '../../lib/tailwind';

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
      containerStyle={tw`mt-2.5 rounded-md`}
      buttonStyle={tw`rounded-md bg-primary-light dark:bg-primary-dark`}
    />
  );
};

CustomButton.defaultProps = {
  disabled: false,
  loading: false,
};

export default CustomButton;
