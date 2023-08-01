import { ApolloError } from 'apollo-server-express';
import { combineResolvers, skip } from 'graphql-resolvers';

import isAuthenticated from './isAuthenticated';

export default async function isAdmin(parent, args, context) {
  function checkAdmin(user) {
    if (user.role !== 'ADMIN') {
      throw new ApolloError('Not authorized');
    }

    return skip;
  }

  const combined = combineResolvers(isAuthenticated, () => checkAdmin(context.currentUser));

  return combined(parent, args, context);
}
