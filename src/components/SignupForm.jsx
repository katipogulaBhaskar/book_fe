import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://book-be-y1yq.onrender.com/api/signupUser", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.msg === "User created successfully") {
        alert("Signup successful!");
        navigate("/login");
      } else {
        setError("Error during signup. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Error during signup. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        :root {
          --primary-color: #6200ea;
          --secondary-color: #03dac6;
          --background-color: #f7f7f7;
          --border-color: #ccc;
          --text-color: #333;
          --input-bg-color: #fff;
          --input-text-color: #333;
          --error-color: #d32f2f;
          --font-family: 'Roboto', sans-serif;
          --transition-time: 0.3s;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: var(--font-family);
          background-color: var(--background-color);
          color: var(--text-color);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }
        form {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
          transition: transform var(--transition-time);
        }
        form:hover {
          transform: scale(1.05);
        }
        h2 {
          font-size: 2rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }
        input {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border-radius: 5px;
          border: 1px solid var(--border-color);
          font-size: 1rem;
          color: var(--input-text-color);
          background-color: var(--input-bg-color);
          outline: none;
          transition: border-color var(--transition-time), box-shadow var(--transition-time);
        }
        input:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 10px rgba(98, 0, 234, 0.5);
        }
        button {
          width: 100%;
          padding: 12px;
          background-color: var(--primary-color);
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color var(--transition-time);
        }
        button:hover {
          background-color: var(--secondary-color);
        }
        p {
          font-size: 1rem;
          color: var(--text-color);
          margin-top: 1rem;
        }
        a {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: bold;
        }
        a:hover {
          text-decoration: underline;
        }
        p.error {
          color: var(--error-color);
          font-size: 1rem;
          margin-top: 10px;
        }
        @media (max-width: 480px) {
          form {
            padding: 1rem;
            width: 100%;
          }
          h2 {
            font-size: 1.5rem;
          }
          input,
          button {
            padding: 10px;
            font-size: 1rem;
          }
        }
      `}</style>
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
        {error && <p className="error">{error}</p>}
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </>
  );
};

export default SignupForm;
