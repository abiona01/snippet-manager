import React, { useEffect, useState } from "react";
import "../style/home.scss";
import axios from "axios";
import Snippet from "../components/Snippet";
import SnippetEditor from "../components/SnippetEditor";
function Home() {
	const [snippets, setSnippets] = useState([]);
	const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
	const [editSnippetData, setEditSnippetData] = useState(null);

	useEffect(() => {
		getSnippets();
	}, []);

	async function getSnippets() {
		const response = await axios.get("http://localhost:5000/snippet/");
		setSnippets(response.data);
	}
	function editSnippet(snippetData) {
		setEditSnippetData(snippetData);
		setSnippetEditorOpen(true);
	}
	function renderSnippet() {
		let sortedSnippets = [...snippets].sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});
		return sortedSnippets.map((snippet, i) => {
			return (
				<Snippet
					key={i}
					snippet={snippet}
					getSnippets={getSnippets}
					editSnippet={editSnippet}
				/>
			);
		});
	}

	return (
		<div className='home'>
			{!snippetEditorOpen && (
				<button
					className='btn-toggle'
					onClick={() => setSnippetEditorOpen(true)}
				>
					Add Snippet
				</button>
			)}
			{snippetEditorOpen && (
				<SnippetEditor
					setSnippetEditorOpen={setSnippetEditorOpen}
					getSnippets={getSnippets}
					editSnippetData={editSnippetData}
					setEditSnippetData={setEditSnippetData}
				/>
			)}
			{renderSnippet()}
		</div>
	);
}

export default Home;
