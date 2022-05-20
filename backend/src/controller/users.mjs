import * as usersModel from '../model/users.mjs';
import { parseJsonBody, validateBodyCredentials } from '../utils/bodyJSONparse.mjs';
import { createId } from '../utils/createId.mjs';
import { createPasswordHash } from '../utils/hashing.mjs';
import jwt from '../services/jwt.mjs';

export const addNewUser = async (req, res) => {
  const newUserBody = await parseJsonBody(req);
  validateBodyCredentials(newUserBody, res);
  newUserBody.password = await createPasswordHash(newUserBody.password);
  const user = {
    id: createId(),
    ...newUserBody,
  };
  const createResult = await usersModel.createNewUserModel(user);
  if (!createResult) {
    res.writeHead(409);
    return {
      error: {
        status: 409,
        message: 'User already exists.'
      }
    }
  }
  return user;
}

export const loginUser = async (req, res) => {
  const newUserBody = await parseJsonBody(req);
  validateBodyCredentials(newUserBody, res);
  const user = await usersModel.findUserByLogin(newUserBody.login);
  if (!user) {
    res.writeHead(404);
    return {
      error: {
        status: 404,
        message: 'User not found.'
      }
    }
  }
  const currentHash = await createPasswordHash(newUserBody.password);
  if (user.password !== currentHash) {
    res.writeHead(401);
    return {
      error: {
        status: 401,
        message: 'Unauthorized.'
      }
    }
  }
  
  return {
    token: jwt.sign({
      sub: user.id,
      name: user.name,
    })
  }
}