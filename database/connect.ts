import mysql2 from "mysql2"

export const connectDB = mysql2.createConnection({
    host: process.env['DB_HOST'] ?? '',
    user: process.env['DB_USER'] ?? '',
    password: process.env['DB_PASSWORD'] ?? '',
    database: process.env['DB_NAME'] ?? '',
    port: +(process.env['DB_PORT'] ?? '3306'),
})
