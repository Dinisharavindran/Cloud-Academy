import { useEffect } from "react";

function Home({ setPage, files, fetchFiles }) {
  useEffect(() => { fetchFiles(); }, []);

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-badge">
          <span className="badge-dot" />
          Live Platform · {files.length} resources shared
        </div>

        <h1>
          Share Knowledge,<br />
          <span>Empower Learning</span>
        </h1>

        <p>
          Upload, discover, and download academic resources — notes,
          assignments, presentations, and research documents — all in one place.
        </p>

        <div className="hero-btns">
          <button className="btn-primary" onClick={() => setPage("view")}>
            📂 Browse Resources
          </button>
          <button className="btn-ghost" onClick={() => setPage("upload")}>
            ⬆ Upload a File
          </button>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-num"><span>{files.length}</span></div>
          <div className="stat-label">Files Shared</div>
          <div className="stat-change">↑ Live</div>
        </div>
        <div className="stat-item">
          <div className="stat-num"><span>4</span></div>
          <div className="stat-label">File Categories</div>
          <div className="stat-change">↑ Active</div>
        </div>
        <div className="stat-item">
          <div className="stat-num"><span>∞</span></div>
          <div className="stat-label">Free Downloads</div>
          <div className="stat-change">Always</div>
        </div>
        <div className="stat-item">
          <div className="stat-num"><span>1</span></div>
          <div className="stat-label">Community</div>
          <div className="stat-change">Growing</div>
        </div>
      </div>

      <div className="features">
        <div className="feat-card">
          <div className="feat-icon v">📘</div>
          <h3>Rich Resources</h3>
          <p>Notes, slides, assignments & research papers organised in one searchable hub.</p>
        </div>
        <div className="feat-card">
          <div className="feat-icon c">👥</div>
          <h3>Community Driven</h3>
          <p>Students & faculty collaborate by uploading and discovering shared knowledge.</p>
        </div>
        <div className="feat-card">
          <div className="feat-icon g">🔒</div>
          <h3>Secure & Fast</h3>
          <p>Your files are safely stored and instantly accessible from anywhere.</p>
        </div>
        <div className="feat-card">
          <div className="feat-icon a">⚡</div>
          <h3>Real-time Updates</h3>
          <p>File listings refresh live so you always see the latest uploads instantly.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;