import mysql2 from "mysql2"
require('dotenv').config()

export const connectDB = mysql2.createConnection({
    host: process.env.DB_HOST ?? '',
    user: process.env.DB_USER ?? '',
    database: process.env.DB_NAME ?? '',
})
