import React, { useState } from "react";
import axios from "axios";

function SnippetEditor(props) {
	const [editorTitle, setEditorTitle] = useState("");
	const [editorDescription, setEditorDescription] = useState("");
	const [editorCode, setEditorCode] = useState("");

	async function saveSnippet(e) {
		e.preventDefault();
		const snippetData = {
			title: editorTitle ? editorTitle : undefined,
			description: editorDescription ? editorDescription : undefined,
			code: editorCode ? editorCode : undefined,
		};
		await axios.post("http://localhost:5000/snippet/", snippetData);
		props.getSnippets();
		closeEditor();
	}
	function closeEditor() {
		props.setNewSnippetEditorOpen(false);
		setEditorTitle("");
		setEditorDescription("");
		setEditorCode("");
	}
	return (
		<div className='snippet-editor'>
			<form onSubmit={saveSnippet}>
				<label htmlFor='editor-title'>Title</label>
				<input
					type='text'
					id='editor-title'
					value={editorTitle}
					onChange={(e) => setEditorTitle(e.target.value)}
				/>
				<label htmlFor='editor-description'>Description</label>
				<input
					type='text'
					id='editor-description'
					value={editorDescription}
					onChange={(e) => setEditorDescription(e.target.value)}
				/>
				<label htmlFor='editor-code'></label>
				<textarea
					name=''
					id='editor-code'
					cols='30'
					rows='10'
					value={editorCode}
					onChange={(e) => setEditorCode(e.target.value)}
				></textarea>
				<button type='submit'>Save Snippet</button>
				<button onClick={closeEditor}>Cancel</button>
			</form>
		</div>
	);
}

export default SnippetEditor;
