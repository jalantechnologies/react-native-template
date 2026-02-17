import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import AddIcon from 'react-native-template/assets/icons/add.svg';
import { AppButton } from '../../../components';

interface TaskHeaderProps {
  onHeaderButtonPress: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onHeaderButtonPress }) => {
  const theme = useTheme() as any;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Tasks</Text>
      <AppButton
        mode="contained"
        icon={({ size, color }) => <AddIcon width={size} height={size} fill="white" />}
        onPress={onHeaderButtonPress}
      >
        Add Task
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TaskHeader;
