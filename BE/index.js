const express = require('express');
const sequelize = require('./config/database');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });