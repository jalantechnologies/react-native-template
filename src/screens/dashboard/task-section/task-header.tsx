import { Button, HStack, Heading, Icon } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface TaskHeaderProps {
  onHeaderButtonPress: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onHeaderButtonPress }) => {
  return (
    <HStack justifyContent="space-between" alignItems="center" px={4} py={2}>
      <Heading size="lg">Tasks</Heading>
      <Button
        startIcon={<Icon as={<MaterialIcons name="add" />} color="white" size="sm" />}
        onPress={onHeaderButtonPress}
      >
        Add Task
      </Button>
    </HStack>
  );
};

export default TaskHeader;
