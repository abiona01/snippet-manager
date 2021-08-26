const mongoose = require("mongoose");

const snipetSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		code: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Snippet = mongoose.model("snippet", snipetSchema);
module.exports = Snippet;
