import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';

import RepositoryList from './RepositoryList'; 
import RepositoryItem from './RepositoryItem';
import SingleRepository from './SingleRepository';

const AppBar = ({ onTabChange }) => {
  return (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={() => onTabChange('Repositories')}>
        <Text style={styles.tabText}>Repositories</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabChange('RepositoryList')}>
        <Text style={styles.tabText}>Repository List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabChange('SignIn')}>
        <Text style={styles.tabText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabChange('SingleRepository')}>
        <Text style={styles.tabText}>Single Repository</Text>
      </TouchableOpacity>
    </View>
  );
};

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
      console.log({ username, password });
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

const Main = () => {
  const [activeTab, setActiveTab] = useState('SignIn');

  return (
    <View style={{ flex: 1 }}>
      <AppBar onTabChange={setActiveTab} />
      {activeTab === 'SignIn' && (
        <View style={styles.container}>
          <SignIn />
        </View>
      )}
      {activeTab === 'Repositories' && (
        <View style={styles.container}>
          <RepositoryList />
        </View>
      )}
      {activeTab === 'RepositoryList' && (
        <View style={styles.container}>
          <RepositoryItem />
        </View>
      )}
      {activeTab === 'SingleRepository' && (
        <View style={styles.container}>
          <SingleRepository />
        </View>
      )}
    </View>
  );
};

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
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: '#0366d6', // Blue color matching the language tag
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

export default Main;
