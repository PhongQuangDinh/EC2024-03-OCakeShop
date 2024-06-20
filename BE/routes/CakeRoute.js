const express = require('express');
const router = express.Router();
const Cake = require('../models/Cake');
const CakeImage = require('../models/CakeImage');

router.get('/', async (req, res, next) => {
    try{
        const cake = await Cake.findAll(
            {
                include: [
                    {
                        model: CakeImage,
                        as: 'CakeImage',
                        required: false,
                    }
                ]
            }
        );
        res.status(200).json(cake);
    }
    catch (err) {next(err)}
});

module.exports = router;
