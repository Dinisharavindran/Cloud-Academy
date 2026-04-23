import { useEffect, useState, useCallback } from "react";

function getFileInfo(name = "") {
  const ext = name.split(".").pop().toLowerCase();
  if (["pdf"].includes(ext))
    return { icon: "📄", cls: "pdf", label: "PDF" };
  if (["doc","docx"].includes(ext))
    return { icon: "📝", cls: "doc", label: "Document" };
  if (["ppt","pptx"].includes(ext))
    return { icon: "📊", cls: "ppt", label: "Slides" };
  if (["jpg","jpeg","png","gif","webp","svg"].includes(ext))
    return { icon: "🖼️", cls: "img", label: "Image" };
  if (["zip","rar","7z"].includes(ext))
    return { icon: "🗜️", cls: "zip", label: "Archive" };
  if (["js","ts","jsx","tsx","py","java","c","cpp","html","css"].includes(ext))
    return { icon: "💻", cls: "code", label: "Code" };
  return { icon: "📁", cls: "file", label: "File" };
}

const FILTERS = ["All", "PDF", "Document", "Slides", "Image", "Code", "Archive"];

export default function View({ files, fetchFiles, setPage }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [layout, setLayout] = useState("grid");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { fetchFiles(); }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await fetchFiles();
    setTimeout(() => setRefreshing(false), 600);
  }, [fetchFiles]);

  const filtered = files.filter(f => {
     const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
  const { label } = getFileInfo(f.name);
    const matchFilter = filter === "All" || label === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="view-page">
      <div className="view-header">
        <div>
          <h2>Shared Resources</h2>
          <p>{filtered.length} of {files.length} files · auto-refreshed</p>
        </div>

        <div className="view-toolbar">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search files…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <button
            className="layout-btn"
            title="Refresh"
            onClick={refresh}
            style={{ fontSize:"16px" }}
          >
            {refreshing ? "⏳" : "🔄"}
          </button>

          <button
            className={`layout-btn ${layout === "grid" ? "active" : ""}`}
            onClick={() => setLayout("grid")}
            title="Grid view"
          >⊞</button>

          <button
            className={`layout-btn ${layout === "list" ? "active" : ""}`}
            onClick={() => setLayout("list")}
            title="List view"
          >☰</button>

          <button
            className="layout-btn"
            style={{ background:"var(--grad)", borderColor:"transparent", color:"#fff", padding:"9px 14px" }}
            onClick={() => setPage("upload")}
          >
            + Upload
          </button>
        </div>
      </div>

      <div className="filter-pills">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`pill ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>{search || filter !== "All" ? "No matching files" : "No files yet"}</h3>
          <p>
            {search || filter !== "All"
              ? "Try a different search or filter."
              : "Be the first to upload a resource!"}
          </p>
        </div>
      ) : layout === "grid" ? (
        <div className="files-grid">
          {filtered.map((file, i) => {
            const { icon, cls, label } = getFileInfo(file);
            return (
              <div className="fcard" key={i} style={{ animationDelay: `${i * 0.04}s` }}>
                <div className={`fcard-icon ${cls}`}>{icon}</div>
                <div className="fcard-name" title={file.name}>{file.name}</div>
                <div className="fcard-meta">
                  <span>{label}</span>
                  <span className="fcard-meta-dot" />
                  <span>Public</span>
                </div>
                <div className="fcard-actions">
                  <a
                   href={file.url}
                    target="_blank" rel="noreferrer"
                    style={{ flex: 1, textDecoration: "none" }}
                  >
                    <button className="fcard-btn dl" style={{ width: "100%" }}>⬇ Download</button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="files-list">
          {filtered.map((file, i) => {
            const { icon, cls, label } = getFileInfo(file);
            return (
              <div className="frow" key={i} style={{ animationDelay: `${i * 0.03}s` }}>
                <div className={`frow-icon ${cls}`}>{icon}</div>
                <div className="frow-info">
                  <div className="frow-name" title={file.name}>{file.name}</div>
                  <div className="frow-sub">{label} · Public</div>
                </div>
                <a
                  href={file.url}
                  target="_blank" rel="noreferrer"
                >
                  <button className="frow-dl">⬇ Download</button>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}