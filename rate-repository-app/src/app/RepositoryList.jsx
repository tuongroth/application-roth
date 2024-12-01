import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Picker, ScrollView } from 'react-native';

// Sample data
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
    createdAt: '2021-03-01',
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
    createdAt: '2021-01-01',
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
    createdAt: '2020-12-15',
  },
];

// Item Separator Component
const ItemSeparator = () => <View style={styles.separator} />;

// Repository Item Component
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
      <Text>Created At: {repository.createdAt}</Text>
    </View>
  );
};

// Repository List Component with sorting logic
const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');

  const handleSortChange = (value) => {
    switch (value) {
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'highest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      default:
        break;
    }
  };

  const sortedRepositories = repositories.sort((a, b) => {
    if (orderBy === 'CREATED_AT') {
      return orderDirection === 'DESC'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (orderBy === 'RATING_AVERAGE') {
      return orderDirection === 'DESC' ? b.ratingAverage - a.ratingAverage : a.ratingAverage - b.ratingAverage;
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Repository List</Text>
      <View style={styles.pickerContainer}>
        <Text>Sort By:</Text>
        <Picker
          selectedValue={orderBy === 'CREATED_AT' ? 'latest' : orderBy === 'RATING_AVERAGE' && orderDirection === 'DESC' ? 'highest' : 'lowest'}
          style={styles.picker}
          onValueChange={handleSortChange}>
          <Picker.Item label="Latest Repositories" value="latest" />
          <Picker.Item label="Highest Rated Repositories" value="highest" />
          <Picker.Item label="Lowest Rated Repositories" value="lowest" />
        </Picker>
      </View>
      <FlatList
        data={sortedRepositories}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true} // Show vertical scrollbar
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.listHeaderText}>Sorted Repositories</Text>
          </View>
        }
      />
    </View>
  );
};

// Main Component
const Main = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <RepositoryList />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  container: {
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  separator: {
    height: 10,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  scrollViewContainer: {
    flexGrow: 1, // Ensures scroll content expands if needed
    paddingBottom: 20,
  },
  headerContainer: {
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  listHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Main;

