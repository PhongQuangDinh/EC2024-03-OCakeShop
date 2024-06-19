const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res, next) => {
    try{
        const user = await User.findAll();
        res.status(200).json(user);
    }
    catch (err) {`A problem is ${err}$`}});

module.exports = router;