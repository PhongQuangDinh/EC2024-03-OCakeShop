// CALL CONTROLLER, SERVICE NOT MODEL

const express = require('express');
const router = express.Router();
const model = require('../models');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res, next) => {
    try{
        const { username, password } = req.body;

        if (!username || !password) {
            console.log("0");
            return res.status(400).json({ message: "Username and password are required" });
        }
        const user = await model.User.findOne({
            where: { username: username }
        });

        if (user) {
            return res.status(401).json({ message: "User has exited" });
        }

        const newUser = await model.User.create({
            username: username,
            password: password});
        
        const getUser = await model.User.findOne({
            where: { username: username }
        });
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({user: getUser, token: token});
    }
    catch(err){
        next(err);
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
            // return res.status(200).json({user: user});
            const token = jwt.sign({ userID: user.userID }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", user: user, token: token });
        } else {
            return res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        next(error);
    }
});
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401); 
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403); 
  
      req.user = user; 
      next();
    });
  };
module.exports = {router, authenticateToken};