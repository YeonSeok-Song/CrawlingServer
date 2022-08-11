import { user } from '../db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

class userController {
    static async signUp({ id, email, password, name }) {
        const oldUser = user.readByEmail(email);
        
    }

    static async logIn({ email, password }) {
    }

    static async logOut({ email, password }) {
    }

    static async changeUserInfo({ id, toUpdate }) {
    }

    static async getUserInfo({ id }) {
    }

    static async withDraw({ id }) {
        
    }
}

export { userController };
