import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import AddIcon from 'react-native-template/assets/icons/add.svg';

import { useTaskStyles } from './task.style';

import { useAppTheme } from '@/theme';

interface TaskHeaderProps {
  onHeaderButtonPress: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onHeaderButtonPress }) => {
  const theme = useAppTheme();
  const styles = useTaskStyles();

  return (
    <View style={styles.header}>
      <Text variant="headlineMedium">
        Tasks
      </Text>
      <Button
        mode="contained"
        icon={() => (
          <AddIcon
            width={theme.iconSizes.sm}
            height={theme.iconSizes.sm}
            fill={theme.colors.onPrimary}
          />
        )}
        onPress={onHeaderButtonPress}
      >
        Add Task
      </Button>
    </View>
  );
};

export default TaskHeader;
