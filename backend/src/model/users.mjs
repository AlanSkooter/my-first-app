import { readJSONAsync } from '../utils/parseJSON.mjs';
import { writeJSONAsync } from '../utils/writeJSON.mjs';
import { pathJSONUser }  from '../utils/pathJSON.mjs';

export const createNewUserModel = async (user) => {
  const allUsers = await readJSONAsync(pathJSONUser);
  const foundUser = allUsers.find((existingUser) => user.login === existingUser.login);
  if (foundUser) {
    return false;
  }
  allUsers.push(user);
  await writeJSONAsync(pathJSONUser, allUsers);
  return true;
};

export const findUserByLogin = async (login) => {
  const users = await readJSONAsync(pathJSONUser);
  return users.find((user) => user.login === login);
};