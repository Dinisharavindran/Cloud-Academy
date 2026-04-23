import { useState } from "react";

function Signup({ setPage, addToast }) {
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      addToast("Account created! Please log in.");
      setPage("login");
      setLoading(false);
    }, 900);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🎓 AcadeX</div>
        <h2>Create account</h2>
        <p className="auth-sub">Join thousands of students sharing knowledge</p>

        <div className="input-group">
          <label>Username</label>
          <input type="text" placeholder="your_username" />
        </div>
        <div className="input-group">
          <label>Email address</label>
          <input type="email" placeholder="you@university.edu" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Create a strong password" />
        </div>
        <div className="input-group">
          <label>Institution</label>
          <input type="text" placeholder="Your university or college" />
        </div>

        <button className="submit-btn" onClick={handleSignup} disabled={loading}>
          {loading ? "Creating account…" : "Create Account →"}
        </button>

        <div className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => setPage("login")}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;