import React, { useState, useEffect, createContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AuthMessage from "./AuthMessage";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const validateCreds = () => {
    if (!username || !password) {
      setStatus({
        type: "error",
        message: "Username and Password cannot be empty",
      });
      return false;
    }
    if (password.length < 8) {
      setStatus({
        type: "error",
        message: "Password must be at least 8 characters long",
      });
      return false;
    }
    setStatus({
      type: "success",
      message: "Login successful!",
    });
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateCreds()) {
      const user = users.find(
        (user) => user.username === username && user.email === password
      );
      if (user) {
        console.log("Login successful");
      } else {
        setStatus({ type: "error", message: "Invalid username or password." });
      }
    }
  };

  useEffect(() => {
    if (status.type === "success") {
      const timer = setTimeout(() => {
        navigate("/courses");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <div>
      <div>
        <Header />
        <h2>LMS Login</h2>
        <AuthContext.Provider value={{ username, password, status }}>
          <form>
            <label for="username">Username:</label>
            <input
              required
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <br />

            <label for="password">Password:</label>
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
          <button onClick={handleSubmit}>Login</button> <br />
          <br />
          <a href="">Forgot Password?</a>
          <AuthMessage />
        </AuthContext.Provider>
        <br />
        <Footer />
      </div>
    </div>
  );
}
