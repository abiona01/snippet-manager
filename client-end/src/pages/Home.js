import React, { useContext, useEffect, useState } from 'react';
import '../style/home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Snippet from '../components/Snippet';
import SnippetEditor from '../components/SnippetEditor';
import UserContext, { BASE_URL } from '../context/userContext';
function Home() {
  const [snippets, setSnippets] = useState([]);
  const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user) {
      setSnippets({});
      return;
    }
    getSnippets();
  }, [user]);

  async function getSnippets() {
    const response = await axios.get(`${BASE_URL}/snippet/`);
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
      {!snippetEditorOpen && user && (
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
      {snippets.length > 0
        ? renderSnippet()
        : user && (
            <p className='no-snippets-message'>
              No snippets have been added yet
            </p>
          )}
      {user === null && (
        <div className='no-user-message'>
          <h2>Welcome to Snippet manager </h2>
          <Link to='/register'>Register here</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
