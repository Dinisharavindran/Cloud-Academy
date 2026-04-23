import { useState } from "react";

function Login({ setUser, setPage, addToast }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email) return addToast("Please enter your email", "error");
    setLoading(true);
    setTimeout(() => {
      setUser(email.split("@")[0]);
      addToast(`Welcome back, ${email.split("@")[0]}! 👋`);
      setPage("home");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🎓 AcadeX</div>
        <h2>Welcome back</h2>
        <p className="auth-sub">Sign in to your account to continue</p>

        <div className="input-group">
          <label>Email address</label>
          <input
            type="email" placeholder="you@university.edu"
            value={email} onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password" placeholder="••••••••"
            value={pass} onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>

        <button className="submit-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in…" : "Sign In →"}
        </button>

        <div className="auth-footer">
          Don't have an account?{" "}
          <span onClick={() => setPage("signup")}>Create one free</span>
        </div>
      </div>
    </div>
  );
}

export default Login;