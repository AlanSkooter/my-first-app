import 'dotenv/config';

export const encryptionKeys = {
    jwtSecret: process.env.JWT,
    passwordSalt: process.env.PW_SALT,
}