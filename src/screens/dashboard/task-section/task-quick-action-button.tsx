import { Icon, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface TaskQuickActionButtonProps {
  bgColor: string;
  iconName: string;
  isLoading?: boolean;
  label: string;
  onPress: () => void;
  textColor: string;
}

const TaskQuickActionButton: React.FC<TaskQuickActionButtonProps> = ({
  bgColor,
  iconName,
  isLoading,
  label,
  onPress,
  textColor,
}) => {
  return (
    <Pressable
      w="70"
      bg={bgColor}
      justifyContent="center"
      onPress={onPress}
      _pressed={{
        opacity: 0.5,
      }}
      disabled={isLoading}
    >
      <VStack alignItems="center" space={2}>
        <Icon as={<MaterialIcons name={iconName} />} size="xs" color={textColor} />
        <Text fontSize="xs" fontWeight="medium" color={textColor}>
          {label}
        </Text>
      </VStack>
    </Pressable>
  );
};

TaskQuickActionButton.defaultProps = {
  isLoading: false,
};

export default TaskQuickActionButton;
