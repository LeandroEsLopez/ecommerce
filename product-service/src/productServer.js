const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./productRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3003;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Product service running on port ${port}`);
});
