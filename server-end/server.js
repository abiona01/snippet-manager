require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

//set up routers
app.use("/snippet", require("./routers/snippetRouter"));

//connect to DB
mongoose.connect(
	process.env.MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	console.log("MongoDB connection SUCCESS".cyan.underline.bold),
	(err) => {
		if (err) return console.log(err);
	}
);
app.listen(5000, () => console.log("Server stated on port 5000".yellow.bold));
