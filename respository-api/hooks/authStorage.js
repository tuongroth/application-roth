// src/utils/authStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  // Get the access token from storage
  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
      return token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  }

  // Save the access token to storage
  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
    } catch (error) {
      console.error('Error saving access token:', error);
    }
  }

  // Remove the access token from storage
  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (error) {
      console.error('Error removing access token:', error);
    }
  }
}

export default AuthStorage;
