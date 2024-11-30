import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      alert(`Sign In Successful! Welcome, ${username}`);
      // Implement your actual sign-in logic here (e.g., call an API)
    }
  };

  return (
    <View style={styles.signInContainer}>
      <TextInput
        style={[styles.input, errors.username && styles.inputError]}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TouchableOpacity style={styles.signInButton} onPress={onSubmit}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signInContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: '#0366d6', // Blue color
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignIn;
