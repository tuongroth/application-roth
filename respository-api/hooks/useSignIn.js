// src/hooks/useSignIn.js
import { useMutation, gql } from '@apollo/client';
import AuthStorage from '../utils/authStorage';
import { useApolloClient } from '@apollo/client';

const AUTHENTICATE_MUTATION = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_MUTATION);
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();

  const signIn = async ({ username, password }) => {
    try {
      // Execute the mutation to get the access token
      const { data } = await mutate({
        variables: {
          credentials: { username, password },
        },
      });

      // Store the access token
      const accessToken = data?.authenticate?.accessToken;
      if (accessToken) {
        await authStorage.setAccessToken(accessToken);
      }

      // Reset the Apollo Client store
      await apolloClient.resetStore();

      return data;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  return [signIn, result];
};

export default useSignIn;
