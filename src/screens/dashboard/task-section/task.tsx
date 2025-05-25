import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from 'boilerplate-react-native/src/components';
import { Task } from 'boilerplate-react-native/src/types';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { Icon, Text } from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TaskDeleteModal from './task-delete-modal';
import { useTaskStyles } from './task.style';

interface TaskProps {
  task: Task;
  handleEditTask: (task: Task) => void;
}

const TaskCard: React.FC<TaskProps> = ({ task, handleEditTask }) => {
  const { description, title } = task;

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
        <CardHeader title={title} />
        <CardContent>
          <Text>{description}</Text>
        </CardContent>
        <CardActions>
          <View style={styles.container}>
            <Button
              kind={ButtonKind.TERTIARY}
              startEnhancer={<Icon as={<MaterialIcons name="edit" />} />}
              onClick={() => handleEditTask(task)}
            >
              Edit
            </Button>

            <Button
              kind={ButtonKind.TERTIARY}
              startEnhancer={<Icon as={<MaterialIcons name="delete" />} color={'danger.600'} />}
              onClick={handleDeleteTask}
            >
              <Text color={'danger.600'}> Delete</Text>
            </Button>
          </View>
        </CardActions>
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
