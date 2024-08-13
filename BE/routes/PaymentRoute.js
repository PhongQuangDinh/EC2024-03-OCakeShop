const express = require("express");
const router = express.Router();
const model = require('../models');

router.get("/", async (req, res, next) => {
  try {
    const cakes = await model.Cake.findAll();

    res.status(200).json(cakes);
  } catch (err) {
    next(err);
  }
});

app.post('/pay', (req, res) => {
  const url = paypal.createOrder(); // pass payment stuff here
  res.redirect(url);
});
app.get('/CONTINUE-ORDER', (req, res) => {
  res.send('Bạn đã mất 100$ :33');
});
app.get('/CANCEL-ORDER', (req, res) => {
  res.send('Bạn ko trả dc ư >:(');
});

module.exports = router;
