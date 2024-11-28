import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';

// Importing RepositoryList Component
import RepositoryList from './RepositoryList';  // Ensure that this path is correct

// AppBar Component (with tabs)
const AppBar = ({ onTabChange }) => {
  return (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={() => onTabChange('Repositories')}>
        <Text style={styles.tabText}>Repositories</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabChange('SignIn')}>
        <Text style={styles.tabText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

// SignIn Component
const SignIn = () => {
  const [username, setUsername] = useState('');  // State for username
  const [password, setPassword] = useState('');  // State for password

  // onSubmit function logs the values of the form when submitted
  const onSubmit = () => {
    console.log({ username, password });
  };

  return (
    <View style={styles.signInContainer}>
      {/* Username Field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />

      {/* Password Field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      {/* Submit Button */}
      <Button title="Sign In" onPress={onSubmit} />
    </View>
  );
};

// Main Component (which includes AppBar and conditional rendering of tabs)
const Main = () => {
  const [activeTab, setActiveTab] = useState('SignIn');  // Default tab is SignIn

  return (
    <View style={{ flex: 1 }}>
      {/* AppBar with tabs */}
      <AppBar onTabChange={setActiveTab} />

      {/* Conditional rendering based on active tab */}
      {activeTab === 'SignIn' && (
        <View style={styles.container}>
          <SignIn />
        </View>
      )}
      {activeTab === 'Repositories' && (
        <View style={styles.container}>
          {/* Render RepositoryList Component when Repositories tab is active */}
          <RepositoryList />
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  appBar: {
    backgroundColor: '#24292e',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabText: {
    color: '#ffffff',
    fontSize: 18,
    padding: 10,
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
  signInContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Main;
