const router = require("express").Router();
const Snippet = require("../models/SnippetModel");
const auth = require("../middleware/auth");
router.get("/", auth, async (req, res) => {
	try {
		console.log(req.user);
		const snippets = await Snippet.find({ user: req.user });
		res.json(snippets);
	} catch (error) {
		res.status(500).send();
	}
});
router.post("/", auth, async (req, res) => {
	try {
		const { title, description, code } = req.body;

		//validation
		if (!description && !code) {
			return res.status(400).json({
				errorMessage: "You need to enter at least a description or some code",
			});
		}
		const newSnippet = new Snippet({
			title,
			description,
			code,
			user: req.user,
		});
		const savedSnippet = await newSnippet.save();
		res.json(savedSnippet);
	} catch (error) {
		res.status(500).send();
	}
});

router.put("/:id", auth, async (req, res) => {
	try {
		const { title, description, code } = req.body;
		const snippetId = req.params.id;
		//validation
		if (!description && !code) {
			return res.status(400).json({
				errorMessage: "You need to enter at least a description or some code",
			});
		}
		if (!snippetId) {
			return res.status(400).json({
				errorMessage: "SnippetId absent",
			});
		}
		const originalSnippet = await Snippet.findById(snippetId);
		if (!originalSnippet) {
			return res.status(400).json({
				errorMessage: "No snippet with this ID found",
			});
		}
		if (originalSnippet.user.toString() !== req.user) {
			return res.status(401).json({ errorMessage: "Unauthorized" });
		}
		originalSnippet.title = title;
		originalSnippet.description = description;
		originalSnippet.code = code;
		const savedSnippet = await originalSnippet.save();
		res.json(savedSnippet);
	} catch (error) {
		res.status(500).send();
	}
});
router.delete("/:id", auth, async (req, res) => {
	try {
		const snippetId = req.params.id;
		if (!snippetId) {
			return res.status(400).json({
				errorMessage: "SnippetId absent",
			});
		}
		const existingSnippet = await Snippet.findById(snippetId);
		if (!existingSnippet) {
			return res.status(400).json({
				errorMessage: "No snippet with this ID found",
			});
		}
		if (existingSnippet.user.toString() !== req.user) {
			return res.status(401).json({ errorMessage: "Unauthorized" });
		}
		await existingSnippet.delete();
		res.json(existingSnippet);
	} catch (error) {
		res.status(500).send();
	}
});
module.exports = router;
