import { Box, VStack, HStack, Divider, Text, Toast, Center } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import SwipeableFlatList from 'react-native-swipeable-list';

import { TaskMessages, TaskOperation } from '../../../constants';
import { useTaskContext } from '../../../contexts';
import { Nullable, Task } from '../../../types';

import TaskAddEditModal from './task-add-edit-modal';
import TaskHeader from './task-header';
import TaskQuickActionButton from './task-quick-action-button';

const TaskSection = () => {
  const { tasks, getTasks, deleteTask, isDeleteTaskLoading } = useTaskContext();

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

  const onTaskOperationComplete = () => {
    const operation = () => {
      switch (taskOperation) {
        case TaskOperation.ADD:
          return TaskMessages.ADD_OPERATION;
        case TaskOperation.EDIT:
          return TaskMessages.EDIT_OPERATION;
        case TaskOperation.DELETE:
          return TaskMessages.DELETE_OPERATION;
        default:
          return '';
      }
    };
    Toast.show({
      title: TaskMessages.SUCCESS_TITLE,
      description: TaskMessages.ADD_SUCCESS(operation()),
    });
    setTaskOperation(null);
  };

  const onTaskOperationFailure = () => {
    Toast.show({
      title: TaskMessages.ERROR_TITLE,
      description: TaskMessages.ADD_FAILURE(
        taskOperation === TaskOperation.ADD
          ? TaskMessages.ADD_FAILURE_OPERATION
          : TaskMessages.EDIT_FAILURE_OPERATION,
      ),
    });
    setTaskOperation(null);
  };

  const handleDeleteTask = (task: Task) => {
    setTaskOperation(TaskOperation.DELETE);
    deleteTask(task)
      .then(() => {
        onTaskOperationComplete();
      })
      .catch(() => {
        onTaskOperationFailure();
      });
    setTaskOperation(null);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setTaskOperation(TaskOperation.EDIT);
    setIsAddEditTaskModalOpen(true);
  };

  const renderTask = (item: Task): React.JSX.Element => (
    <Box py={2} bg={'white'}>
      <VStack>
        <Text bold>{item.title}</Text>
        <Text>{item.description}</Text>
      </VStack>
    </Box>
  );

  const renderQuickActions = (item: Task) => {
    return (
      <HStack flex="1" alignSelf={'flex-end'}>
        <TaskQuickActionButton
          bgColor="coolGray.200"
          iconName="edit"
          label="Edit"
          onPress={() => handleEditTask(item)}
          textColor="coolGray.800"
        />
        <TaskQuickActionButton
          bgColor="danger.500"
          iconName="delete"
          label="Delete"
          onPress={() => handleDeleteTask(item)}
          textColor="white"
          isLoading={isDeleteTaskLoading}
        />
      </HStack>
    );
  };

  return (
    <Box bg={'white'} flex={1} p={2}>
      <TaskHeader
        onHeaderButtonPress={() => {
          setTaskOperation(TaskOperation.ADD);
          setIsAddEditTaskModalOpen(true);
        }}
      />

      <Box mt={2} px={4} borderWidth={1} rounded={'md'} borderColor={'coolGray.200'} flexShrink={1}>
        <SwipeableFlatList
          data={tasks}
          ItemSeparatorComponent={Divider}
          keyExtractor={item => item.id}
          maxSwipeDistance={140}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => renderTask(item)}
          renderQuickActions={({ item }) => renderQuickActions(item)}
          shouldBounceOnMount={true}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Center py={2}>
              <Text>{TaskMessages.NO_TASKS_FOUND}</Text>
            </Center>
          }
        />
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
