import { Button } from '@rneui/themed';
import React from 'react';
import { useStyles } from './styles';

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
  const styles = useStyles();
  return (
    <Button
      onPress={onPress}
      disabled={disabled}
      title={title}
      loading={loading}
      containerStyle={styles.container}
      buttonStyle={styles.button}
    />
  );
};

CustomButton.defaultProps = {
  disabled: false,
  loading: false,
};

export default CustomButton;
