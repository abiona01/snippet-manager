import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/snippetEditor.scss';
import Error from './Error';
import { BASE_URL } from '../context/userContext';

function SnippetEditor({
  getSnippets,
  setSnippetEditorOpen,
  editSnippetData,
  setEditSnippetData,
}) {
  const [editorTitle, setEditorTitle] = useState('');
  const [editorDescription, setEditorDescription] = useState('');
  const [editorCode, setEditorCode] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (editSnippetData) {
      setEditorTitle(editSnippetData.title ? editSnippetData.title : '');
      setEditorDescription(
        editSnippetData.description ? editSnippetData.description : ''
      );
      setEditorCode(editSnippetData.code ? editSnippetData.code : '');
    }
    return () => {
      setEditSnippetData(null);
    };
  }, [editSnippetData, setEditSnippetData]);
  async function saveSnippet(e) {
    e.preventDefault();
    const snippetData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      code: editorCode ? editorCode : undefined,
    };
    try {
      if (!editSnippetData)
        await axios.post(`${BASE_URL}/snippet/`, snippetData);
      else
        await axios.put(
          `${BASE_URL}/snippet/${editSnippetData._id}`,
          snippetData
        );
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
    getSnippets();
    closeEditor();
  }
  function closeEditor() {
    setSnippetEditorOpen(false);
    setEditorTitle('');
    setEditorDescription('');
    setEditorCode('');
  }
  return (
    <div className='snippet-editor'>
      {errorMessage && (
        <Error message={errorMessage} clear={() => setErrorMessage(null)} />
      )}
      <form onSubmit={saveSnippet} className='form'>
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
        <button className='btn-save' type='submit'>
          Save{' '}
        </button>
        <button className='btn-cancel' onClick={closeEditor}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default SnippetEditor;
