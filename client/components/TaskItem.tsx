
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEditPress: (task: Task) => void;
  onDeletePress: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onEditPress,
  onDeletePress,
}) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={[styles.statusButton, task.completed && styles.completedStatus]}
        onPress={() => onToggleStatus(task.id)}
      >
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <Text style={[styles.taskText, task.completed && styles.completedText]}>
        {task.title}
      </Text>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEditPress(task)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDeletePress(task.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default TaskItem;
