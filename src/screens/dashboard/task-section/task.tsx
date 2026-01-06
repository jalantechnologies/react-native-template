import { Text } from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, useTheme  } from 'react-native-paper';
import DeleteIcon from 'react-native-template/assets/icons/delete.svg';
import EditIcon from 'react-native-template/assets/icons/edit.svg';
import { Card } from 'react-native-template/src/components';
import { Task } from 'react-native-template/src/types';


import TaskDeleteModal from './task-delete-modal';
import { useTaskStyles } from './task.style';

interface TaskProps {
  task: Task;
  handleEditTask: (task: Task) => void;
}

const TaskCard: React.FC<TaskProps> = ({ task, handleEditTask }) => {
  const { description, title } = task;

  const theme = useTheme();

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
      <Card>
        <Card.Header title={title} />
        <Card.Content>
          <Text>{description}</Text>
        </Card.Content>
        <Card.Actions>
          <View style={styles.container}>
            <Button
              mode="text"
              icon={() => (
                <EditIcon
                  width={16}
                  height={16}
                  fill={theme.colors.primary}
                />
              )}
              onPress={() => handleEditTask(task)}
            >
              Edit
            </Button>
            <Button
              mode="text"
              textColor={theme.colors.error}
              icon={() => (
                <DeleteIcon width={16} height={16} fill={theme.colors.error} />
              )}
              onPress={handleDeleteTask}
            >
              Delete
            </Button>
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
