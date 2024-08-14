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
        const { username, password } = req.body;
        if (!username || !password) {
            console.log("0");
            return res.status(400).json({ message: "Username and password are required" });
        }
        const user = await model.User.findOne({
            where: { username: username }
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ message: "Login successful", user: user });
        } else {
            return res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        next(error);
    }
});
module.exports = router;