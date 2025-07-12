import mysql from 'mysql2/promise'
import dotenv from 'dotenv';
dotenv.config();

export const db = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PW,
    database: process.env.DB,
})
console.log("mysql connected");

