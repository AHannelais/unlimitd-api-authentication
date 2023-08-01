import { combineResolvers } from 'graphql-resolvers';

import UserWorkflow from '../../workflows/users';
import isAuthenticated from '../shared/resolvers/isAuthenticated';

const Query = {
  currentUser: async function getCurrentUser(parent, args, { currentUser }) {
    const combined = combineResolvers(isAuthenticated, () => UserWorkflow.getAccountInfoById(currentUser.id));

    return combined(parent, args, { currentUser });
  },
};

const Mutation = {
  login: async (parent, { email, password }) => UserWorkflow.login({ email, password }),
};

export default {
  Mutation,
  Query,
};
