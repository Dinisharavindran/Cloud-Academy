function Navbar({ user, setUser, setPage, page, addToast }) {
  return (
    <div className="navbar">
      <div className="logo" onClick={() => window.location.href = "/.auth/login/aad"}>🎓 AcadeX</div>

      <div className="nav-center">
        <button className={`nav-link ${page === "home" ? "active" : ""}`} onClick={() => setPage("home")}>Home</button>
        <button className={`nav-link ${page === "view" ? "active" : ""}`} onClick={() => setPage("view")}>Browse</button>
        {user && (
          <button className={`nav-link ${page === "upload" ? "active" : ""}`} onClick={() => setPage("upload")}>Upload</button>
        )}
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <button onClick={() => setPage("login")}>Log in</button>
            <button className="btn-primary" onClick={() => setPage("signup")}>Sign Up</button>
          </>
        ) : (
          <>
            <div className="user-chip">
              <div className="avatar">{user.userDetails?.[0]?.toUpperCase()}</div>
              <span>{user.userDetails}</span>
              <div className="live-dot" title="Online" />
            </div>
            <button onClick={() => { window.location.href = "/.auth/logout"; }}></button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;