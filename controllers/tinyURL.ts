// const tinyURL = require('../routes/tinyURL');
import { connectDB } from '../database/connect';

export const registerEmail = async (req : any , res : any) => {
    // const { email } = req.body;
    let sql = "SELECT * FROM `users`"
    connectDB.query(sql, function (err: any, result: any) {
        if (err)
            throw err;
        res.status(200).json({
            message: 'success',
            data: result
        });
    })
}

export const generateLongURL  = async (req : any, res : any) => {
    const urlStr = req.params.url;
    let sql = "SELECT * FROM `url`";
    connectDB.query(sql, function (err: any, result: any){
        if(err) throw err;
        res.status(200).json({
            message: 'success',
            data: result,
            url: urlStr
        })
    })
}
