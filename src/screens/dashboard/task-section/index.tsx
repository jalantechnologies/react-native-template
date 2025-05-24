import { Box, Text, Toast, Center, ScrollView } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl } from 'react-native';

import { TaskOperation } from '../../../constants';
import { useTaskContext } from '../../../contexts';
import { AsyncError, Nullable, Task } from '../../../types';

import TaskCard from './task';
import TaskAddEditModal from './task-add-edit-modal';
import TaskHeader from './task-header';

const TaskSection = () => {
  const { tasks, getTasks } = useTaskContext();
  const { t } = useTranslation();

  const [taskOperation, setTaskOperation] = useState<Nullable<TaskOperation>>(null);
  const [isAddEditTaskModalOpen, setIsAddEditTaskModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Nullable<Task>>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTasks().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  const onTaskOperationComplete = (description: string) => {
    Toast.show({
      title: 'Success',
      description,
    });
    setTaskOperation(null);
  };

  const onTaskOperationFailure = (err: AsyncError) => {
    Toast.show({
      title: 'Error',
      description: err.message,
    });
    setTaskOperation(null);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setTaskOperation(TaskOperation.EDIT);
    setIsAddEditTaskModalOpen(true);
  };

  return (
    <Box bg={'white'} flex={1} p={2}>
      <TaskHeader
        onHeaderButtonPress={() => {
          setTaskOperation(TaskOperation.ADD);
          setIsAddEditTaskModalOpen(true);
        }}
      />
      <Box mt={2} flexShrink={1}>
        {tasks.length > 0 ? (
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {tasks.map(task => (
              <Box my={2} key={task.id}>
                <TaskCard task={task} handleEditTask={handleEditTask} />
              </Box>
            ))}
          </ScrollView>
        ) : (
          <Center py={2}>
            <Text>{t('task:noTaskFound')}</Text>
          </Center>
        )}
      </Box>

      <TaskAddEditModal
        isModalOpen={isAddEditTaskModalOpen}
        onTaskOperationComplete={onTaskOperationComplete}
        onTaskOperationFailure={onTaskOperationFailure}
        setModalOpen={setIsAddEditTaskModalOpen}
        task={taskToEdit}
        taskOperation={taskOperation}
      />
    </Box>
  );
};

export default TaskSection;
