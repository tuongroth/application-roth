import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const data = [
  {
    id: '1',
    fullName: 'owner/repo1',
    description: 'This is the first repository.',
    language: 'JavaScript',
    forksCount: 1043,
    starsCount: 8849,
    ratingAverage: 4.5,
    reviewCount: 5,
    avatarUrl: 'https://www.w3schools.com/w3images/avatar2.png', // Cute avatar image
  },
];

// Helper function to format numbers over 1000 to use "k"
const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.avatarContainer}>
      {/* Avatar Image */}
      <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
    </View>
    <View style={styles.repoDetails}>
      <View style={styles.header}>
        <Text style={styles.fullName}>{item.fullName}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.languageTag}>
        <Text style={styles.languageText}>{item.language}</Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatCount(item.starsCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatCount(item.forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>
    </View>
  </View>
);

const RepositoryList = () => (
  <FlatList
    data={data}
    renderItem={({ item }) => <RepositoryItem item={item} />}
    keyExtractor={(item) => item.id}
    style={styles.list}
  />
);

const SingleRepository = () => (
  <View style={styles.container}>
    {/* Render the RepositoryList component */}
    <RepositoryList />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // White background for a clean look
    padding: 10,
  },
  list: {
    backgroundColor: 'white', // Match the background of the container
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white', // White background for individual repository card
    padding: 15,
    marginBottom: 10,
    borderRadius: 10, // Slightly rounded corners for a subtle effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Add subtle shadow to the cards
  },
  avatarContainer: {
    marginRight: 15,
    alignItems: 'center', // Center the avatar container
    justifyContent: 'center',
  },
  avatar: {
    width: 50, // Standard avatar size
    height: 50,
    borderRadius: 25, // Circular avatar
    borderWidth: 2,
    borderColor: '#0366d6', // Blue border to match the language tag
  },
  repoDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333', // Dark gray color for text
  },
  description: {
    marginBottom: 5,
    color: 'gray', // Gray color for description text
  },
  languageTag: {
    backgroundColor: '#0366d6', // Blue background for the language tag
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  languageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#0366d6', // Blue color for stats values
  },
  statLabel: {
    fontSize: 12,
    color: 'gray', // Gray color for stat labels
  },
  separator: {
    height: 10,
  },
});

export default SingleRepository;
