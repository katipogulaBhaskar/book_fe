import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending POST request to login API
      const response = await axios.post("http://localhost:5000/api/loginUser", credentials, {
        headers: { "Content-Type": "application/json" },
      });

      // Checking response for success
      if (response.data.msg === "Login successful") {
        alert("Login successful!");

        // Save user details (or just a userId) in localStorage for future use
        localStorage.setItem("user", JSON.stringify({ userId: response.data.userId }));

        // Redirect to /book-actions after login
        navigate("/book-actions");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Don't have an account? <a href="/signup">Signup here</a>
      </p>
    </form>
  );
};

export default LoginForm;
