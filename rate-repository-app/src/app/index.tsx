import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import RepositoryList from './RepositoryList'; 
import RepositoryItem from './RepositoryItem';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview'; 
import SignIn from './SignIn'; 
import SignUp from './SignUp'; // Import the SignUp component

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
      <TouchableOpacity onPress={() => onTabChange('SignUp')}> {/* New Sign Up button */}
        <Text style={styles.tabText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabChange('SingleRepository')}>
        <Text style={styles.tabText}>Single Repository</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabChange('CreateReview')}>
        <Text style={styles.tabText}>Create Review</Text>
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
      {activeTab === 'SignUp' && (
        <View style={styles.container}>
          <SignUp /> {/* Display SignUp component */}
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
      {activeTab === 'CreateReview' && (
        <View style={styles.container}>
          <CreateReview />
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
});

export default Main;
