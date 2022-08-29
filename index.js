const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./route')

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect(process.env.mongoURL, { dbName: 'products'}).then(() => {
  app.listen(process.env.port, () => {
     console.log(`App Listening on port ${process.env.port}`)
  })
});

app.get('/', (req,res) => {
  return res.json({
    server: 'product-srv',
    working: true
  })
})

app.use('/api/products', route);