// CALL CONTROLLER, SERVICE NOT MODEL

const express = require('express');
const router = express.Router();
const model = require('../models');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res, next) => {
    try{
        const request = req.body;
        const newUser = await model.User.create({
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
        const username = req.body.username;
        const password = req.body.password;
        const user = await model.User.findOne({
            where: { username: username }
        });

        if (!user) {
            return res.status(401).json({ message: "Authentication unsuccessful" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

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