import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

// Sample data for repository and reviews
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

const reviews = [
  {
    id: '1',
    rating: 90,
    createdAt: '2024-10-31',
  },
  {
    id: '2',
    rating: 85,
    createdAt: '2024-10-18',
  },
  {
    id: '3',
    rating: 95,
    createdAt: '2024-10-22',
  },
  {
    id: '4',
    rating: 70,
    createdAt: '2024-08-24',
  },
];

// Helper function to format numbers over 1000 to use "k"
const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

// Repository's information component
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

// Single review item component
const ReviewItem = ({ review, onDelete, onRedButtonPress }) => (
  <View style={styles.reviewItem}>
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>
    <View style={styles.reviewContent}>
      {/* Removed user name and review text */}
      <Text style={styles.createdAt}>Reviewed on {review.createdAt}</Text>
    </View>
    {/* Buttons under the review content */}
    <View style={styles.buttonContainer}>
      {/* Blue button */}
      <TouchableOpacity style={styles.button} onPress={onDelete}>
        <Text style={styles.buttonText}>Delete Review</Text>
      </TouchableOpacity>
      {/* Red button */}
      <TouchableOpacity style={styles.redButton} onPress={onRedButtonPress}>
        <Text style={styles.buttonText}>Red Button</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Main FlatList component for Repository and Reviews
const SingleRepository = () => {
  const handleDeleteReview = (reviewId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            console.log(`Deleted review with ID: ${reviewId}`);
          },
        },
      ]
    );
  };

  const handleRedButtonPress = (reviewId) => {
    console.log(`Red button pressed for review with ID: ${reviewId}`);
  };

  return (
    <View style={styles.container}>
      {/* Render the Repository List */}
      <RepositoryItem item={data[0]} />
      
      {/* Render reviews */}
      <Text style={styles.reviewsHeader}>Reviews:</Text>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            onDelete={() => handleDeleteReview(item.id)}
            onRedButtonPress={() => handleRedButtonPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

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
  reviewItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reviewContent: {
    marginTop: 10,
  },
  createdAt: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    marginTop: 10,
  },
  reviewsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  // Unified button style
  button: {
    backgroundColor: '#0366d6', // Blue color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10, // Space between the buttons
  },
  buttonText: {
    color: '#fff', // White text on blue background
    fontWeight: 'bold',
  },
  // New red button style
  redButton: {
    backgroundColor: '#e74c3c', // Red color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default SingleRepository;
