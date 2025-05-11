import { Task } from "@/types/type";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";



interface TaskFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  initialValue: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialValue,
}) => {
  const [title, setTitle] = useState(initialValue.title);
  const [completed, setCompleted] = useState(initialValue.status);
  const isEditing = initialValue.taskId !== "";

  useEffect(() => {
    setTitle(initialValue.title);
    setCompleted(initialValue.status);
  }, [initialValue]);

  const handleSubmit = () => {
    if (title.trim() === "") {
      Alert.alert("Error", "Task title cannot be empty");
      return;
    }

    onSubmit({
      ...initialValue,
      title: title.trim(),
      status:completed,
    });

    setTitle("");
    setCompleted(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
              {isEditing ? "Edit Task" : "Add New Task"}
            </Text>

            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title"
              autoFocus
            />

            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Status:</Text>
              <TouchableOpacity
                style={[styles.statusButton, completed && styles.completedStatus]}
                onPress={() => setCompleted(!completed)}
              >
                {completed && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              <Text>{completed ? "Completed" : "Pending"}</Text>
            </View>

            <View style={styles.formButtons}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{isEditing ? "Update" : "Add"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});

export default TaskForm;
