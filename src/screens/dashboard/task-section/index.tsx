import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { TaskOperation } from '../../../constants';
import { useTaskContext, useToast } from '../../../contexts';
import { AsyncError, Nullable, Task } from '../../../types';

import TaskCard from './task';
import TaskAddEditModal from './task-add-edit-modal';
import TaskHeader from './task-header';

const TaskSection = () => {
  const { tasks, getTasks } = useTaskContext();
  const { t } = useTranslation();
  const theme = useTheme();
  const toast = useToast();

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
    toast.show(description);
    setTaskOperation(null);
  };

  const onTaskOperationFailure = (err: AsyncError) => {
    toast.show(err.message);
    setTaskOperation(null);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setTaskOperation(TaskOperation.EDIT);
    setIsAddEditTaskModalOpen(true);
  };

  return (
    <View style={styles.container}>
      <TaskHeader
        onHeaderButtonPress={() => {
          setTaskOperation(TaskOperation.ADD);
          setIsAddEditTaskModalOpen(true);
        }}
      />
      <View style={styles.listContainer}>
        {tasks.length > 0 ? (
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={styles.scrollContent}
          >
            {tasks.map(task => (
              <View key={task.id} style={styles.cardWrapper}>
                <TaskCard task={task} handleEditTask={handleEditTask} />
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 16 }}>{t('task:noTaskFound')}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  listContainer: {
    marginTop: 8,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  cardWrapper: {
    marginVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
});

export default TaskSection;
