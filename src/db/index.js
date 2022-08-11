import mongoose from "mongoose";
import 'dotenv/config';
import { User } from './models/User';

const DB_URL = process.env.MONGODB_URL || null;
if (!DB_URL) {
    console.log("No DB-URL in Here!!");
}

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('MongoDB Connection Success! ' + DB_URL));
db.on('error', (error) => console.error('MongoDB Connection Fail! ' + DB_URL + '\n' + error));

export { User };