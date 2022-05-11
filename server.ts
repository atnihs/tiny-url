import express from 'express'
import mysql2 from "mysql2"
require('dotenv').config()

const app = express();
const port = 3000

app.get('/api/users', (req, res) => {
    res.status(200).json({
        message: 'success'
    })
})

app.post('/api/user/:url', (req, res) => {
    const urlStr = req.params.url;
    res.status(200).json({
        message: 'success',
        data: urlStr
    })
})

const con = mysql2.createConnection({
    host: process.env['DB_HOST'] ?? '',
    user: process.env['DB_USER'] ?? '',
    password: process.env['DB_PASSWORD'] ?? '',
    database: process.env['DB_NAME'] ?? '',
    port: +(process.env['DB_PORT'] ?? '3306'),
})

con.connect(function(err) {
    if(err) throw err;
    console.log('Connect successfully 1!')
})

app.listen(port, () => { 
    console.log(`Server listening on http://localhost:${port}`)
})