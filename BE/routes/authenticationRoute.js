const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res, next) => {
    try{
        const request = req.body;
        const newUser = await User.create({
            username: request.username,
            password: request.password});
        res.status(200).json(newUser);
    }
    catch(err){
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { username: req.body.username }
        });

        if (!user) {
            return res.status(401).json({ message: "Authentication unsuccessful" });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (isMatch) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: "Authentication unsuccessful" });
        }
    } catch (error) {
        next(error);
    }
});
module.exports = router;