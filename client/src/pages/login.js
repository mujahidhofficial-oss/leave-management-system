import { useState } from "react";
import { loginAPI } from "../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("employee@gamage.com");
  const [password, setPassword] = useState("Employee@123");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginAPI({ email, password });

      if (res.token) {
        onLogin(res);
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      alert("Network error: Backend not running or blocked by CORS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: 20 }}>
      <h2>Login</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
