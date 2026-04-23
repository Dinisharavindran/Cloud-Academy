import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Upload from "./components/Upload";
import View from "./components/View";
import "./App.css";
import { useEffect } from "react";



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

  // ✅ Toast
  const addToast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => {
      setToasts(p => p.filter(t => t.id !== id));
    }, 3500);
  }, []);

  // ✅ AUTH (Azure Static Web App)
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/.auth/me");
        const data = await res.json();

        console.log("AUTH USER:", data);

        if (data.length > 0 && data[0].clientPrincipal) {
          setUser(data[0].clientPrincipal);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
      }
    };

    getUser();
  }, []);

  

  // ✅ FETCH FILES
  const fetchFiles = useCallback(async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/files?user=${user?.userDetails?.split("@")[0]}`
    );
    const data = await res.json();

    console.log("FILES FROM API:", data);

    if (Array.isArray(data)) {
      setFiles(data.filter(f => f && f.name && f.url));
    } else {
      setFiles([]);
    }
  } catch (err) {
    console.error("Error fetching files:", err);
    setFiles([]);
  }
}, [user]); // ✅ important
useEffect(() => {
  if (user) {
    fetchFiles();
  }
}, [user, fetchFiles]);
  return (
    <div className="app">
      <Navbar
        user={user}
        setUser={setUser}
        setPage={setPage}
        page={page}
        addToast={addToast}
      />

      {page === "home" && (
        <Home setPage={setPage} files={files} fetchFiles={fetchFiles} />
      )}

      {page === "login" && (
        <Login setUser={setUser} setPage={setPage} addToast={addToast} />
      )}

      {page === "signup" && (
        <Signup setPage={setPage} addToast={addToast} />
      )}

      {/* 🔒 PROTECTED UPLOAD */}
      {page === "upload" && (
        user ? (
          <Upload
            user={user}
            fetchFiles={fetchFiles}
            setPage={setPage}
            addToast={addToast}
          />
        ) : (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Please login to upload files</h2>
            <button
              onClick={() => (window.location.href = "/.auth/login/aad")}
            >
              Login with Microsoft
            </button>
          </div>
        )
      )}

      {page === "view" && (
        <View files={files} fetchFiles={fetchFiles} setPage={setPage} />
      )}

      <Toast toasts={toasts} />
    </div>
  );
}

export default App;