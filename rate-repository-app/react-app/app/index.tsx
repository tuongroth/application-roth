import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { format } from 'date-fns';

// MongoDB authentication URL
const MONGO_AUTH_URL = 'https://eu-west-2.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-zbmnuij/auth/providers/local-userpass/login';

// SignIn Component
const SignIn = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [token, setToken] = React.useState(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(MONGO_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setToken(result.access_token);
        console.log('Sign-in successful, token:', result.access_token);
        navigation.navigate('SingleRepository');
      } else {
        setError(result.error || 'Sign-in failed');
      }
    } catch (e) {
      console.error('Sign-in error:', e);
      setError('An error occurred during sign-in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign In" onPress={handleSignIn} disabled={loading} />
      {error && <Text style={styles.error}>{error}</Text>}
      {token && <Text style={styles.success}>Sign-in successful! Token: {token}</Text>}
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

// SignUp Component
const SignUp = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    // Here you would typically call your signup API endpoint.
    // For demonstration, we're simply logging the sign-up information.
    try {
      console.log('Sign-up:', { username, password });
      Alert.alert('Sign Up Successful', `Welcome ${username}!`);
      // Navigate back to sign-in or another screen
    } catch (e) {
      console.error('Sign-up error:', e);
      setError('An error occurred during sign-up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} disabled={loading} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

// Repository's information component
const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.repoName}>{repository.name}</Text>
      <Text style={styles.repoDescription}>{repository.description}</Text>
      <Text style={styles.repoStats}>
        Stars: {repository.stars} | Forks: {repository.forks}
      </Text>
    </View>
  );
};

// Single review item component
const ReviewItem = ({ review, onDelete }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.reviewItem}>
      <Image source={{ uri: review.user.avatar }} style={styles.avatar} />
      <View style={styles.reviewDetails}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewContent}>
          <Text style={styles.userName}>{review.user.name}</Text>
          <Text style={styles.createdAt}>{formattedDate}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="View Repository" onPress={() => console.log('Navigating to repository details')} />
          <Button title="Delete" onPress={onDelete} color="#ff4757" />
        </View>
      </View>
    </View>
  );
};

// Main FlatList component
const SingleRepository = () => {
  const repository = {
    name: 'React Native',
    description: 'A framework for building native apps using React.',
    stars: 12000,
    forks: 2000,
  };

  const reviews = [
    {
      id: '1',
      user: { name: 'Mehiläinen', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      rating: 90,
      text: 'Before: Constantly late, making the whole team wait, showing no emotion. || After: "Not late anymore! Prioritizing mental health."',
      createdAt: '2023-10-20',
    },
    {
      id: '2',
      user: { name: 'Nurse', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      rating: 85,
      text: 'Before: "Struggling with sleep and focus." || After: "Able to sleep and focus; prioritizing mental health and meditation is helping."',
      createdAt: '2023-10-21',
    },
    {
      id: '3',
      user: { name: 'Basma/Monika-Naiset', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
      rating: 92,
      text: 'Before: No soul, suffering from PTSD exhaustion and lack of energy. || After: "Reenergized, gaining a more balanced perspective on health."',
      createdAt: '2023-10-22',
    },
  ];

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

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} onDelete={() => handleDeleteReview(item.id)} />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.contentContainer} // Added for padding
    />
  );
};

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

// Main App Component
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="SingleRepository" component={SingleRepository} options={{ title: 'Repository Reviews' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Home Tabs Component
const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Sign In" component={SignIn} />
      <Tab.Screen name="Repositories" component={SingleRepository} />
    </Tab.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
  header: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  repoName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  repoDescription: {
    fontSize: 16,
    color: '#6c757d',
  },
  repoStats: {
    fontSize: 14,
    color: '#6c757d',
  },
  reviewItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  reviewDetails: {
    flex: 1,
  },
  ratingContainer: {
    backgroundColor: '#f0ad4e',
    borderRadius: 10,
    padding: 4,
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  reviewContent: {
    marginVertical: 8,
  },
  userName: {
    fontWeight: 'bold',
  },
  createdAt: {
    color: '#6c757d',
  },
  reviewText: {
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#e9ecef',
  },
  contentContainer: {
    paddingBottom: 16,
  },
});

// Export the App component
export default App;