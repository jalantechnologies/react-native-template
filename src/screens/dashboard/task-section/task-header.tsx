import AddIcon from 'boilerplate-react-native/assets/icons/add.svg';
import { Button } from 'boilerplate-react-native/src/components';
import { HStack, Heading, useTheme } from 'native-base';
import React from 'react';

interface TaskHeaderProps {
  onHeaderButtonPress: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onHeaderButtonPress }) => {
  const theme = useTheme();

  return (
    <HStack justifyContent="space-between" alignItems="center" px={4} py={2}>
      <Heading size="lg">Tasks</Heading>
      <Button
        startEnhancer={<AddIcon width={16} height={16} fill={theme.colors.secondary[50]} />}
        onClick={onHeaderButtonPress}
      >
        Add Task
      </Button>
    </HStack>
  );
};

export default TaskHeader;
