import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text, Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { TaskOperation } from '../../../constants';
import { useTaskContext } from '../../../contexts';
import { AsyncError, Nullable, Task } from '../../../types';

import TaskCard from './task';
import TaskAddEditModal from './task-add-edit-modal';
import TaskHeader from './task-header';
import { useTaskStyles } from './task.style';

const TaskSection = () => {
  const { tasks, getTasks } = useTaskContext();
  const { t } = useTranslation();
  const styles = useTaskStyles();

  const [taskOperation, setTaskOperation] =
    useState<Nullable<TaskOperation>>(null);
  const [isAddEditTaskModalOpen, setIsAddEditTaskModalOpen] =
    useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [taskToEdit, setTaskToEdit] =
    useState<Nullable<Task>>(null);

  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: '' });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTasks().finally(() => setRefreshing(false));
  }, [getTasks]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const onTaskOperationComplete = (description: string) => {
    setSnackbar({
      visible: true,
      message: description,
    });
    setTaskOperation(null);
  };

  const onTaskOperationFailure = (err: AsyncError) => {
    setSnackbar({
      visible: true,
      message: err.message,
    });
    setTaskOperation(null);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setTaskOperation(TaskOperation.EDIT);
    setIsAddEditTaskModalOpen(true);
  };

  return (
    <View style={styles.taskScreen}>
      <TaskHeader
        onHeaderButtonPress={() => {
          setTaskOperation(TaskOperation.ADD);
          setIsAddEditTaskModalOpen(true);
        }}
      />

      <View style={{ flex: 1, marginTop: 8 }}>
        {tasks.length > 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
            {tasks.map(task => (
              <View key={task.id} style={{ marginVertical: 8 }}>
                <TaskCard
                  task={task}
                  handleEditTask={handleEditTask}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.center}>
            <Text>{t('task:noTaskFound')}</Text>
          </View>
        )}
      </View>

      <TaskAddEditModal
        isModalOpen={isAddEditTaskModalOpen}
        onTaskOperationComplete={onTaskOperationComplete}
        onTaskOperationFailure={onTaskOperationFailure}
        setModalOpen={setIsAddEditTaskModalOpen}
        task={taskToEdit}
        taskOperation={taskOperation}
      />

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() =>
          setSnackbar({ visible: false, message: '' })
        }
      >
        {snackbar.message}
      </Snackbar>
    </View>
  );
};

export default TaskSection;
