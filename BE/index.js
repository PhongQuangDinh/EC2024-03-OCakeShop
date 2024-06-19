const express = require('express');
const router = require('./routes/router');
const sequelize = require('./config/database');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

router(app);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://0.0.0.0:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });