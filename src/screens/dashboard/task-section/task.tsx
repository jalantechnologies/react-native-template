import DeleteIcon from 'react-native-template/assets/icons/delete.svg';
import EditIcon from 'react-native-template/assets/icons/edit.svg';
import { Button, Card } from 'react-native-template/src/components';
import { Task } from 'react-native-template/src/types';
import { ButtonKind } from 'react-native-template/src/types/button';
import { Text, useTheme } from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';

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
              kind={ButtonKind.LINK}
              startEnhancer={<EditIcon width={16} height={16} fill={theme.colors.primary[500]} />}
              onClick={() => handleEditTask(task)}
            >
              Edit
            </Button>

            <Button
              kind={ButtonKind.LINK}
              startEnhancer={<DeleteIcon width={16} height={16} fill={theme.colors.danger[600]} />}
              onClick={handleDeleteTask}
            >
              <Text color={'danger.600'}> Delete</Text>
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
