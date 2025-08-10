import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.status === 403) {
        window.alert("Account not verified. Please check your email.");
        localStorage.setItem("signupEmail", email);
        navigate("/verify");
      } else if (!response.ok) {
        throw new Error("invalid credentials");
      } else {
        const data = await response.json();
        login(data.token);
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      window.alert(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">LOGIN</button>
      </form>
      <div className="link-text">
        Don't have an account ? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}
