import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "./components/SignupForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import BookActions from "./components/BookActions.jsx";  // Importing the new component

// Protected Route Component (checks if user is logged in)
const ProtectedRoute = ({ children }) => {
  const userLoggedIn = localStorage.getItem("user"); // Using localStorage to track login status
  return userLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/book-actions"
          element={
            <ProtectedRoute>
              <BookActions />  {/* Using the new BookActions component */}
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
