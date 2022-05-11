import express from 'express';
const router = express.Router();
const {registerEmail, generateLongURL} = require('../controllers/tinyURL')

router.route('/').get(registerEmail);
router.route('/:url').post(generateLongURL);

module.exports = router;