import { getDataFromToken } from '../../shared/authentication';

export default async function getContext({ token }) {
  const { tokenData, user: currentUser } = await getDataFromToken(token);
  return {
    currentUser,
    tokenData,
  };
}
