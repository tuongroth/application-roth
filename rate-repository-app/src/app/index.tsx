import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text } from 'react-native';
import RepositoryList from './app-example/RepositoryList';  // Import RepositoryList

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#e1e4e8',  // Set a background color for better contrast
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 20,
  },
});

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Rate Repository Application</Text>
      <RepositoryList />  {/* Render the RepositoryList component */}
    </View>
  );
};

export default Index;
