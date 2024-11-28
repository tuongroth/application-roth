import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

// Styles
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
  separator: {
    height: 10,
  },
  item: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});

// Mock Data
const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
  },
];

// ItemSeparator Component
const ItemSeparator = () => <View style={styles.separator} />;

// RepositoryItem Component
const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{repository.fullName}</Text>
      <Text>{repository.description}</Text>
      <Text>Language: {repository.language}</Text>
      <Text>Forks: {repository.forksCount}</Text>
      <Text>Stars: {repository.stargazersCount}</Text>
      <Text>Rating: {repository.ratingAverage}</Text>
      <Text>Reviews: {repository.reviewCount}</Text>
    </View>
  );
};

// RepositoryList Component
const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
    />
  );
};

// Main Component
const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Repository Application Feedback</Text>
      <RepositoryList />
    </View>
  );
};

export default Main;
