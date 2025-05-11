import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { Task } from "@/types/type";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useSelector } from "react-redux";


const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const emptyTask: Task = {
    _id: "",
    taskId: "",
    title: "",
    status: false,
    ownerId: "",
    createdAt: "",
    updatedAt: "",
  };

  const [currentTask, setCurrentTask] = useState<Task>(emptyTask);
  const userData = useSelector((state: any) => state.user);
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, [router]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/tasks", {
        params: { ownerId: userData?.user.uid },
      });

      const normalizedTasks: Task[] = response.data.tasks.map((t: any) => ({
        _id: t._id,
        taskId: t.taskId,
        title: t.title,
        status: t.status,
        ownerId: t.ownerId,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }));

      setTasks(normalizedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [userData?.user.uid]);

  const addTask = useCallback(async (task: Task) => {
    try {
      const response = await axiosInstance.post("/tasks", {
        title: task.title,
        ownerId: userData?.user.uid,
        status: task.status,
      });

      const newTask: Task = response.data;
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }, [userData?.user.uid]);

  const updateTask = useCallback(async (task: Task) => {
    try {
      const response = await axiosInstance.put(`/tasks/${task.taskId}`, task);
      const updatedTask: Task = response.data;

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.taskId === task.taskId ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            setTasks((prevTasks) =>
              prevTasks.filter((task) => task.taskId !== taskId)
            );
          } catch (error) {
            console.error("Error deleting task:", error);
          }
        },
      },
    ]);
  }, []);

  const toggleTaskStatus = useCallback(async (taskId: string) => {
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}/toggle`);
      const updatedTask: Task = response.data;

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.taskId === taskId ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  }, []);

  const handleSubmit = useCallback(
    (task: Task) => {
      if (task.taskId) {
        updateTask(task);
      } else {
        addTask(task);
      }
    },
    [addTask, updateTask]
  );

  const handleEditPress = useCallback((task: Task) => {
    setCurrentTask(task);
    setModalVisible(true);
  }, []);

  const handleAddPress = useCallback(() => {
    setCurrentTask({ ...emptyTask, ownerId: userData?.user.uid });
    setModalVisible(true);
  }, [userData?.user.uid]);

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.status).length;
    const pending = tasks.length - completed;
    return { total: tasks.length, completed, pending };
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Manager</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Total: {stats.total} | Completed: {stats.completed} | Pending: {stats.pending}
        </Text>
      </View>

      <FlatList
        style={styles.list}
        data={tasks}
        refreshing={loading}
        onRefresh={fetchTasks}
        renderItem={({ item }: { item: Task }) => (
          <TaskItem
            task={item}
            onToggleStatus={() => toggleTaskStatus(item.taskId)}
            onEditPress={() => handleEditPress(item)}
            onDeletePress={() => deleteTask(item.taskId)}
          />
        )}
        keyExtractor={(item: Task) => item.taskId}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>
              No tasks yet. Add your first task!
            </Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <TaskForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        initialValue={currentTask}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#4a6da7",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  stats: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  statsText: { fontSize: 12, color: "#666" },
  list: { flex: 1 },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4a6da7",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addButtonText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});

export default TaskList;
