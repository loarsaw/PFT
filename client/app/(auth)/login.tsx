import { login } from "@/redux/slice/user";
import axiosInstance from "@/utils/axiosInstance";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const response = await axiosInstance.post("/signin", {
      email,
      password,
    });

    const { user, token } = response.data;
    dispatch(login({ user, token }));

    Alert.alert("Success", "Logged in successfully");
  } catch (error: any) {
    if (error?.response?.status === 401) {
      Alert.alert("Login Failed", "Either email or password is incorrect");
    } else {
      const msg =
        error?.response?.data?.message || "Something went wrong. Please try again.";
      Alert.alert("Login Failed", msg);
    }
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text
          style={styles.link}
          onPress={() => Alert.alert("Navigate", "Forgot Password Screen")}
        >
          Forgot Password?
        </Text>
        <Link href="/signup" style={[styles.link, styles.signupLink]}>
          Don’t have an account? Sign up
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1f2937",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    fontSize: 18,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
  },
  link: {
    color: "#2563eb",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  signupLink: {
    marginTop: 8,
  },
});

export default Login;
