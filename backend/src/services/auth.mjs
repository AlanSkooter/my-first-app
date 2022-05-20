import jwt from '../services/jwt.mjs';

export const checkAuth = (req) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new Error;
    }
    try {
        const [_, token] = authorization.split(' ');
        req.user = jwt.verify(token);
    } catch (err) {
        throw new Error;
    }
}