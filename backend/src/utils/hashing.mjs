import bcrypt from 'bcrypt';
import { encryptionKeys }  from './constants.mjs';

export const createPasswordHash = (password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, encryptionKeys.passwordSalt, (err, hash) => {
        if (err) {
            reject(err);
        } else {
            resolve(hash);
        }
    });
});