const express = require("express");
const router = express.Router();
const model = require('../models');
const paypal = require('../services/paypal');

router.get("/", async (req, res, next) => {
  try {
    const cakes = await model.Payment.findAll();

    res.status(200).json(cakes);
  } catch (err) {
    next(err);
  }
});

router.post('/pay', (req, res) => { // put inside form action for submit button
  const url = paypal.createOrder().then(result => {
    res.status(200).json({"check this link": result});
  });
  // res.redirect(url);
});
router.get('/CONTINUE-ORDER', (req, res) => {
  res.send('Bạn đã mất 100$ :33');
});
router.get('/CANCEL-ORDER', (req, res) => {
  res.send('Bạn ko trả dc ư >:(');
});

module.exports = router;