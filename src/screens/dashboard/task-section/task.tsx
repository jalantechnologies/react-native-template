import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import DeleteIcon from 'react-native-template/assets/icons/delete.svg';
import EditIcon from 'react-native-template/assets/icons/edit.svg';
import { Task } from 'react-native-template/src/types';
import { AppButton } from '../../../components';

import TaskDeleteModal from './task-delete-modal';
import { useTaskStyles } from './task.style';

interface TaskProps {
  task: Task;
  handleEditTask: (task: Task) => void;
}

const TaskCard: React.FC<TaskProps> = ({ task, handleEditTask }) => {
  const { description, title } = task;
  const theme = useTheme() as any;

  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const styles = useTaskStyles();

  const handleDeleteTask = () => {
    setIsDeleteTaskModalOpen(true);
  };

  const handleCloseDeleteTaskModal = () => {
    setIsDeleteTaskModalOpen(false);
  };

  return (
    <>
      <Card mode="elevated" style={{ backgroundColor: 'white' }}>
        <Card.Title 
          title={title}
          titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
        />
        <Card.Content>
          <Text style={{ fontSize: 16 }}>{description}</Text>
        </Card.Content>
        <Card.Actions>
          <View style={styles.container}>
            <AppButton
              mode="text"
              icon={({ size, color }) => <EditIcon width={size} height={size} fill={theme.colors.primary} />}
              onPress={() => handleEditTask(task)}
            >
              Edit
            </AppButton>

            <AppButton
              mode="text"
              icon={({ size, color }) => <DeleteIcon width={size} height={size} fill={theme.colors.error} />}
              onPress={handleDeleteTask}
              textColor={theme.colors.error}
            >
              Delete
            </AppButton>
          </View>
        </Card.Actions>
      </Card>
      <TaskDeleteModal
        task={task}
        handleModalClose={handleCloseDeleteTaskModal}
        isModalOpen={isDeleteTaskModalOpen}
      />
    </>
  );
};

export default TaskCard;
