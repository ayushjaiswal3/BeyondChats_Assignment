import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://127.0.0.1:8000/api/articles";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API)
      .then(res => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loader">Loading Articles...</div>;
  }

  return (
    <div className="app">
      <header className="top">
        <h1>BeyondChats AI Blog Engine</h1>
        <p>Original Articles → AI-Enhanced Content</p>
      </header>

      <div className="cards">
        {articles.map(a => (
          <div className="card" key={a.id}>
            <div className="card-top">
              <span className={a.is_ai_generated ? "tag ai" : "tag original"}>
                {a.is_ai_generated ? "AI Updated" : "Original"}
              </span>
            </div>

            <h2>{a.title}</h2>

            <p className="preview">
              {a.content?.slice(0, 180)}...
            </p>

            <div className="actions">
              <button onClick={() => setSelected(a)}>
                Read Full
              </button>
              <a href={a.source_url} target="_blank">
                Source ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal">
          <div className="modal-box">
            <button className="close" onClick={() => setSelected(null)}>×</button>
            <h2>{selected.title}</h2>
            <span className={selected.is_ai_generated ? "tag ai" : "tag original"}>
              {selected.is_ai_generated ? "AI Enhanced Article" : "Original Article"}
            </span>
            <p className="full">{selected.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
