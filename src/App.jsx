import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Upload from "./components/Upload";
import View from "./components/View";
import "./App.css";

function Toast({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span className="toast-dot" />
          {t.msg}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3009/files");
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  }, []);

  return (
    <div className="app">
      <Navbar user={user} setUser={setUser} setPage={setPage} page={page} addToast={addToast} />
      {page === "home"   && <Home setPage={setPage} files={files} fetchFiles={fetchFiles} />}
      {page === "login"  && <Login setUser={setUser} setPage={setPage} addToast={addToast} />}
      {page === "signup" && <Signup setPage={setPage} addToast={addToast} />}
      {page === "upload" && <Upload user={user} fetchFiles={fetchFiles} setPage={setPage} addToast={addToast} />}
      {page === "view"   && <View files={files} fetchFiles={fetchFiles} setPage={setPage} />}
      <Toast toasts={toasts} />
    </div>
  );
}

export default App;