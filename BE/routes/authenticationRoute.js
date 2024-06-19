const express = require('express');
const router = express.Router();

router.get('/login',(req, res, next) => {
    res.status(200).send('Login Route');
});

router.get('/signup',(req, res, next) => {
    res.status(200).send('Signup Route');
});

router.get('/storeUser',(req, res, next) => {
    res.status(200).send('Store user');
});

module.exports = router;