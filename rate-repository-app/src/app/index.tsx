import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';
import RepositoryList from './RepositoryList';  // Import RepositoryList

// AppBar Component (with tabs)
const AppBar = ({ onTabChange }) => {
  return (
    <View style={styles.appBar}>
      <Button title="Repositories" onPress={() => onTabChange('Repositories')} />
      <Button title="Sign In" onPress={() => onTabChange('SignIn')} />
    </View>
  );
};

// SignIn Component
const SignIn = () => {
  return (
    <View style={styles.signInContainer}>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button title="Sign In" onPress={() => {}} />
    </View>
  );
};

// Main Component
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
