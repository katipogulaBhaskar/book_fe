import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignupForm.css"; // Import the CSS file

const SignupForm = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(""); // For showing error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending POST request to the signup API
      const response = await axios.post("http://localhost:5000/api/signupUser", user, {
        headers: {
          "Content-Type": "application/json", // Make sure we send proper content type
        },
      });

      // Assuming the response contains a message like "User created successfully"
      if (response.data.msg === "User created successfully") {
        alert("Signup successful!");
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        setError("Error during signup. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Error during signup. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        name="username"
        placeholder="Username"
        value={user.username}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Signup</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </form>
  );
};

export default SignupForm;
