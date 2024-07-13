const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRoutes = require('./orderRoutes');
require('dotenv').config();

const app = express();
const port = process.env.ORDER_PORT || 3001;

mongoose.connect(process.env.ORDER_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Order service running on port ${port}`);
});