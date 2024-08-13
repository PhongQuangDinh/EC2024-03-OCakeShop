require('dotenv').config()

const PORT = process.env.PORT || 8080;
const express = require('express');
const router = require('./routes/router');
const sequelize = require('./config/dbConfig');
// const morgan = require('morgan');

const paypal = require('./services/paypal');

const app = express();

// app.use(morgan('combined'));
app.use(express.json());

router(app);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//     return sequelize.sync();
//   })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://0.0.0.0:${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   })
//   .finally(()=>{
//     console.log('Waiting...');
//   });