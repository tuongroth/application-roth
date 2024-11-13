import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  content: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
    color: '#555',
  },
  language: {
    marginTop: 5,
    fontStyle: 'italic',
    color: '#555',
  },
  stats: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    color: '#888',
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.title}>{repository.fullName}</Text>
        <Text style={styles.description}>{repository.description}</Text>
        <Text style={styles.language}>{repository.language}</Text>
        <View style={styles.stats}>
          <Text style={styles.statText}>Forks: {repository.forksCount}</Text>
          <Text style={styles.statText}>Stars: {repository.stargazersCount}</Text>
          <Text style={styles.statText}>Rating: {repository.ratingAverage}%</Text>
          <Text style={styles.statText}>Reviews: {repository.reviewCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
