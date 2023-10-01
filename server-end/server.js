require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors());
app.use(express.json());

app.use(cookieParser());

//set up routers
app.use('/snippet', require('./routers/snippetRouter'));
app.use('/auth', require('./routers/userRouter'));

//connect to DB
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log('MongoDB connection SUCCESS'.cyan.underline.bold),
  (err) => {
    if (err) return console.log(err);
  }
);
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log('Server stated on port 5000'.yellow.bold));
