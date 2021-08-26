import React, { useEffect, useState } from "react";
import axios from "axios";
import Snippet from "../components/Snippet";
import SnippetEditor from "../components/SnippetEditor";
function Home() {
	const [snippets, setSnippets] = useState([]);
	const [newSnipppetEditorOpen, setNewSnippetEditorOpen] = useState(false);

	useEffect(() => {
		getSnippets();
	}, []);

	async function getSnippets() {
		const response = await axios.get("http://localhost:5000/snippet/");
		setSnippets(response.data);
	}
	function renderSnippet() {
		let sortedSnippets = [...snippets].sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});
		return sortedSnippets.map((snippet, i) => {
			return <Snippet key={i} snippet={snippet} />;
		});
	}

	return (
		<div className='home'>
			{!newSnipppetEditorOpen && (
				<button onClick={() => setNewSnippetEditorOpen(true)}>
					Add Snippet
				</button>
			)}
			{newSnipppetEditorOpen && (
				<SnippetEditor
					setNewSnippetEditorOpen={setNewSnippetEditorOpen}
					getSnippets={getSnippets}
				/>
			)}
			{renderSnippet()}
		</div>
	);
}

export default Home;
