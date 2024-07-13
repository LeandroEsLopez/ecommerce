const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.USER_PORT || 3001;

mongoose.connect(process.env.USER_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`User service running on port ${port}`);
});
