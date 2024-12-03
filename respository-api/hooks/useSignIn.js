// src/hooks/useSignIn.js
import { useMutation, gql } from '@apollo/client';

// Define the authenticate mutation (you should refer to the documentation for the exact mutation structure)
const AUTHENTICATE_MUTATION = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_MUTATION);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: { username, password },
        },
      });
      return data; // This will contain the access token
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  return [signIn, result];
};

export default useSignIn;
