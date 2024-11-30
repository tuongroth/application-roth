import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const validate = () => {
    if (username.length < 5 || username.length > 30) {
      Alert.alert('Error', 'Username must be between 5 and 30 characters.');
      return false;
    }
    if (password.length < 5 || password.length > 50) {
      Alert.alert('Error', 'Password must be between 5 and 50 characters.');
      return false;
    }
    if (password !== passwordConfirmation) {
      Alert.alert('Error', 'Password confirmation must match the password.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    Alert.alert('Success', 'Account created successfully!');
    // Add mutation and sign-in logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SignUp;
