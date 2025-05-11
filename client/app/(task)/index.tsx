import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
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

interface Task {
  id: string;
  title: string;
  completed: boolean;
}


const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task>({
    id: "",
    title: "",
    completed: false,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Task) => {
    try {
      const response = await axiosInstance.post("/tasks", {
        title: task.title,
        completed: task.completed,
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const response = await axiosInstance.put(`/tasks/${task.id}`, task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? response.data : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = (taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            setTasks((prevTasks) =>
              prevTasks.filter((task) => task.id !== taskId)
            );
          } catch (error) {
            console.error("Error deleting task:", error);
          }
        },
      },
    ]);
  };

  const toggleTaskStatus = async (taskId: string) => {
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}/toggle`);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? response.data : t))
      );
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handleSubmit = (task: Task) => {
    if (task.id) {
      updateTask(task);
    } else {
      addTask(task);
    }
  };

  const handleEditPress = (task: Task) => {
    setCurrentTask(task);
    setModalVisible(true);
  };

  const handleAddPress = () => {
    setCurrentTask({ id: "", title: "", completed: false });
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Manager</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Total: {tasks.length} | Completed:{" "}
          {tasks.filter((task) => task.completed).length} | Pending:{" "}
          {tasks.filter((task) => !task.completed).length}
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
            onToggleStatus={toggleTaskStatus}
            onEditPress={handleEditPress}
            onDeletePress={deleteTask}
          />
        )}
        keyExtractor={(item: Task) => item.id}
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
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
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
  statsText: {
    fontSize: 12,
    color: "#666",
  },
  list: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4a6da7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  completedStatus: {
    backgroundColor: "#4a6da7",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  actionsContainer: {
    flexDirection: "row",
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginRight: 5,
  },
  editButtonText: {
    color: "#333",
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#ff6b6b",
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#fff",
  },
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
  addButtonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  formContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  statusLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  submitButton: {
    backgroundColor: "#4a6da7",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
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
