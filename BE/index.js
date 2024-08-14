require('dotenv').config()

const PORT = process.env.PORT || 8080;
const express = require('express');
const router = require('./routes/router');
const sequelize = require('./config/dbConfig');
const paypal = require('./services/paypal');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('combined'));

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

router(app);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});