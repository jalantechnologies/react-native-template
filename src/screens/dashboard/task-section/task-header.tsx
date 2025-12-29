import React from 'react';
import AddIcon from 'react-native-template/assets/icons/add.svg';
import { Text, useTheme, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useTaskStyles } from './task.style';
interface TaskHeaderProps {
  onHeaderButtonPress: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onHeaderButtonPress }) => {
  const theme = useTheme();
  const styles = useTaskStyles();

  return (
    <View style={styles.header}>
      <Text variant="headlineMedium">
        Tasks
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        icon={() => (
          <AddIcon
            width={16}
            height={16}
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