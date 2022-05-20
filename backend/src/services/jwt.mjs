import jwt from 'jsonwebtoken';
import { encryptionKeys } from '../utils/constants.mjs';

export default {
    sign: (data) => jwt.sign(data, encryptionKeys.jwtSecret, { expiresIn: '30 days' }),
    verify: (token) => jwt.verify(token, encryptionKeys.jwtSecret),
}