import { Link } from 'expo-router';
import React from 'react';
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

const Signup = () => {
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
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Sign Up Button Pressed')}
        >
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
  background: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 144, 
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
