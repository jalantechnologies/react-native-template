import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from 'boilerplate-react-native/src/components';
import { useTaskContext } from 'boilerplate-react-native/src/contexts';
import { AsyncError, Task } from 'boilerplate-react-native/src/types';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { t } from 'i18next';
import { Icon, Text, Toast } from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTaskStyles } from './task.style';

interface TaskProps {
  task: Task;
  handleEditTask: (task: Task) => void;
}

const TaskCard: React.FC<TaskProps> = ({ task, handleEditTask }) => {
  const { description, title } = task;

  const { deleteTask } = useTaskContext();

  const [isDeleteTaskLoading, setIsDeleteTaskLoading] = useState(false);

  const styles = useTaskStyles();

  const onTaskOperationComplete = (desc: string) => {
    Toast.show({
      title: 'Success',
      description: desc,
    });
  };

  const onTaskOperationFailure = (err: AsyncError) => {
    Toast.show({
      title: 'Error',
      description: err.message,
    });
  };

  const handleDeleteTask = (taskToDelete: Task) => {
    setIsDeleteTaskLoading(true);
    deleteTask(taskToDelete)
      .then(() => {
        onTaskOperationComplete(t('task:deleteTaskSuccess'));
      })
      .catch(err => {
        onTaskOperationFailure(err);
      })
      .finally(() => setIsDeleteTaskLoading(false));
  };

  return (
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
            onClick={() => handleDeleteTask(task)}
            isLoading={isDeleteTaskLoading}
          >
            <Text color={'danger.600'}> Delete</Text>
          </Button>
        </View>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
