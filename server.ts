import express from 'express'
import { connectDB } from './database/connect';
const  tinyURL  = require('./routes/tinyURL')
require('dotenv').config()

const app = express();

const port = 3000

app.use('/api/user/', tinyURL)

const start = () => {
    try {
        connectDB.connect();
        app.listen(port, () => {
            console.log(`Server listening on http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();