// const tinyURL = require('../routes/tinyURL');
import { connectDB } from '../database/connect';

export const registerEmail = (req : any , res : any) => {
    // const { email } = req.body;
    // test get DB 
    let sql = "SELECT * FROM users"
    connectDB.query(sql, function (err: any, result: any) {
        if (err) throw err;
        res.status(200).json({
            message: 'success',
            data: result
        })
    })
}

export const generateLongURL  = (req : any, res : any) => {
    const urlStr = req.params.url;
    res.status(200).json({
        message: 'success',
        data: urlStr
    })
}
