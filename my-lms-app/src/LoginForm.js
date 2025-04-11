import React, { useState, createContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AuthMessage from "./AuthMessage";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  function handleAuthentication() {
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Invalid username or password");
        }
      })
      .then((response) => {
        setAuthenticated(true);
        localStorage.setItem("studentId", response.id); // Store ID
        setStatus({ type: "success", message: "Authentication successful" });
        navigate("/courses"); // Redirect after authentication
      })
      .catch((error) => {
        setAuthenticated(false);
        setStatus({
          type: "error",
          message: error.message || "Authentication Failed. Invalid Creds",
        });
      });
  }

  return (
    <div>
      <Header />
      <h2>LMS Login</h2>
      <AuthContext.Provider value={{ username, password, status }}>
        <form>
          <label htmlFor="username">Username:</label>
          <input
            required
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            required
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </form>
        <br />
        <br />
        <button onClick={handleAuthentication}>Login</button>
        <br />
        <br />
        <a href="">Forgot Password?</a>
        <AuthMessage />
      </AuthContext.Provider>
      <Footer />
    </div>
  );
}