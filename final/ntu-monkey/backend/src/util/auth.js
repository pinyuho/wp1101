import jwt from 'jsonwebtoken';
import crypto from 'crypto'; 

function genToken(_id) {
    return jwt.sign( { _id: _id } , process.env.TOKEN_SECRET, { expiresIn: process.env.LOGIN_EXPIRE_DAYS });
}

function authToken(token) {
    try {
        return {
            success: true,
            _id: jwt.verify(token, process.env.TOKEN_SECRET)._id,
            error: ''
        }
    } catch(error) {
        return {
            success: false,
            username: '',
            error: error.message // 'jwt expired'
        }
    }
} 

function hashPassword(password) {
    return crypto.pbkdf2Sync(password, process.env.SALT, 1000, 64, `sha512`).toString(`hex`);
}

export { genToken, authToken, hashPassword }