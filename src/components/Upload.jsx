import { useState, useRef } from "react";
const BASE_URL = import.meta.env.VITE_API_URL;
function getFileIcon(name = "") {
  const ext = name.split(".").pop().toLowerCase();
  if (["pdf"].includes(ext)) return { icon: "📄", cls: "pdf" };
  if (["doc","docx"].includes(ext)) return { icon: "📝", cls: "doc" };
  if (["ppt","pptx"].includes(ext)) return { icon: "📊", cls: "ppt" };
  if (["jpg","jpeg","png","gif","webp","svg"].includes(ext)) return { icon: "🖼️", cls: "img" };
  if (["zip","rar","7z"].includes(ext)) return { icon: "🗜️", cls: "zip" };
  if (["js","ts","jsx","tsx","py","java","c","cpp","html","css"].includes(ext)) return { icon: "💻", cls: "code" };
  return { icon: "📁", cls: "file" };
}

function formatSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function Upload({ user, fetchFiles, setPage, addToast }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleFile = f => { if (f) setFile(f); };

  const handleDrop = e => {
    e.preventDefault(); setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return addToast("Please select a file first", "error");
    if (!user)  return addToast("Log in to upload files", "error");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", user.userDetails);

    try {
      setLoading(true);
      setProgress(20);

      // simulate progress
      const tick = setInterval(() => setProgress(p => p < 85 ? p + 10 : p), 200);

      const res = await fetch(`${BASE_URL}/upload`, {
  method: "POST",
  body: formData,
});

      clearInterval(tick);
      setProgress(100);

      if (!res.ok) throw new Error("Upload failed");

      addToast(`"${file.name}" uploaded successfully! 🎉`);
      setFile(null);
      setProgress(0);
      fetchFiles();
      setTimeout(() => setPage("view"), 1200);

    } catch (err) {
      console.error(err);
      setProgress(0);
      addToast("Upload failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const { icon, cls } = file ? getFileIcon(file.name) : {};

  return (
    <div className="upload-page">
      <div className="upload-main">
        <h2>Upload Resource</h2>
        <p>Share your notes, slides, or assignments with the community</p>

        <div className="section-divider" />

        {!user && (
          <div style={{
            padding:"14px 16px", borderRadius:"var(--r-md)",
            background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.25)",
            color:"#f87171", fontSize:"13px", marginBottom:"16px",
            display:"flex", gap:"10px", alignItems:"center"
          }}>
            <span>⚠️</span>
            <span>You need to <strong style={{cursor:"pointer", textDecoration:"underline"}} onClick={() => (window.location.href = "/.auth/login/aad")}>log in</strong> to upload files.</span>
          </div>
        )}

        <input
          ref={inputRef} type="file" className="hidden-input"
          onChange={e => handleFile(e.target.files[0])}
        />

        <div
          className={`drop-zone${dragging ? " drag-over" : ""}`}
          onClick={() => inputRef.current.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="drop-icon">📂</div>
          <div className="drop-title">
            {dragging ? "Drop it here!" : "Drag & drop your file"}
          </div>
          <div className="drop-sub">
            or <span>click to browse</span> · PDF, DOCX, PPTX, images & more
          </div>
        </div>

        {file && (
          <div className="file-preview">
            <div className={`fcard-icon ${cls}`} style={{margin:0}}>{icon}</div>
            <div className="file-preview-info">
              <div className="file-preview-name">{file.name}</div>
              <div className="file-preview-size">{formatSize(file.size)}</div>
            </div>
            <button className="file-preview-remove" onClick={() => setFile(null)}>✕</button>
          </div>
        )}

        {loading && (
          <div className="progress-bar-wrap">
            <div className="progress-bar" style={{ width: progress + "%" }} />
          </div>
        )}

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={loading || !file}
          style={{ marginTop: "8px" }}
        >
          {loading ? `Uploading… ${progress}%` : "⬆ Upload File"}
        </button>
      </div>

      <div className="upload-side">
        <h2>Upload Guidelines</h2>
        <p>Help keep AcadeX useful for everyone</p>

        <ul className="tip-list" style={{marginTop:"20px"}}>
          {[
            ["📋", "Academic content only", "Notes, assignments, slides, papers, code projects"],
            ["📦", "File size limit", "Max 50 MB per file for smooth sharing"],
            ["🏷️", "Use clear names", "Name files descriptively for easy discovery"],
            ["🔒", "Respect copyright", "Only upload content you have rights to share"],
          ].map(([dot, title, desc], i) => (
            <li key={i} className="tip-item">
              <div className="tip-dot" style={{
                background: ["var(--v1)","var(--c1)","var(--g1)","var(--a1)"][i]
              }} />
              <div className="tip-text"><strong>{title}.</strong> {desc}</div>
            </li>
          ))}
        </ul>

        <div className="section-divider" style={{marginTop:"28px"}} />

        <h2 style={{marginBottom:"4px"}}>Your Stats</h2>
        <p>
  Uploading as{" "}
  <strong style={{ color: "var(--v1)" }}>
    {user?.userDetails?.split("@")[0] || "guest"}
  </strong>
</p>

        <div className="upload-stats">
          <div className="ustat">
            <div className="ustat-num">—</div>
            <div className="ustat-label">Your uploads</div>
          </div>
          <div className="ustat">
            <div className="ustat-num">—</div>
            <div className="ustat-label">Downloads</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;