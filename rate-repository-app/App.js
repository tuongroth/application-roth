import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import RepositoryList from './components/RepositoryList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RepositoryList />
    </SafeAreaView>
  );
};

export default App;
