require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const snippetRoutes = require('./routers/snippetRouter');
const authRoutes = require('./routers/userRouter');
const app = express();
//connect to DB
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('MongoDB connection SUCCESS'.cyan.underline.bold)
);

// Use CORS middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//set up routers
app.use('/snippet', snippetRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.yellow.bold)
);
