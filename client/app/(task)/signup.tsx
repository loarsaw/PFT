import { login } from '@/redux/slice/user';
import axiosInstance from '@/utils/axiosInstance';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await axiosInstance.post('/signup', {
        email,
        password,
      });

      const { user, token } = response.data;

      dispatch(login({ user, token }));

      Alert.alert('Success', 'Account created');
      router.replace('/');
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || 'Signup failed. Try again later.';
      Alert.alert('Signup Failed', msg);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.form}>
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

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginLinkContainer}>
          <Link href="/" style={styles.loginLink}>
            Already have an account? Login
          </Link>
        </View>
      </SafeAreaView>

      <StatusBar barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: 64,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    paddingTop: 28,
  },
  form: {
    marginTop: 32,
  },
  input: {
    height: 56,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    height: 56,
    backgroundColor: '#28a745',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginLink: {
    color: '#007bff',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});

export default Signup;
