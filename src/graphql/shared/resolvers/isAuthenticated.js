import { ApolloError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';

export default async function isAuthenticated(parent, args, context) {
  if (!context.currentUser) {
    throw new ApolloError('Not authorized');
  }

  return skip;
}
