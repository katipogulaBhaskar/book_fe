import React, { useState } from "react";
import AddBookForm from "./BookForm.jsx"; // Assuming BookForm is the Add Book form
// import BorrowBookForm from "./BorrowForm.jsx"; // Assuming BorrowForm is the Borrow Book form

const BookActions = () => {
  const [activeForm, setActiveForm] = useState(""); // To toggle between Add and Borrow form

  const showAddBookForm = () => {
    setActiveForm("add");
  };

  const showBorrowBookForm = () => {
    setActiveForm("borrow");
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
        .container {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
          text-align: center;
          transition: transform var(--transition-time);
        }
        .container:hover {
          transform: scale(1.05);
        }
        h2 {
          font-size: 2rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }
        .button-group {
          margin-bottom: 1.5rem;
        }
        button {
          padding: 12px 20px;
          margin: 5px;
          border-radius: 5px;
          border: none;
          background-color: var(--primary-color);
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color var(--transition-time);
        }
        button:hover {
          background-color: var(--secondary-color);
        }
        button:focus {
          outline: none;
          box-shadow: 0 0 10px rgba(98, 0, 234, 0.5);
        }
        @media (max-width: 480px) {
          .container {
            padding: 1rem;
          }
          h2 {
            font-size: 1.5rem;
          }
          button {
            padding: 10px;
            font-size: 0.9rem;
          }
        }
      `}</style>
      <div className="container">
        <h2>Book Actions</h2>
        <div className="button-group">
          <button onClick={showAddBookForm}>Add Book</button>
          {/* <button onClick={showBorrowBookForm}>Borrow Book</button> */}
        </div>
        {activeForm === "add" && <AddBookForm />}
        {/* {activeForm === "borrow" && <BorrowBookForm />} */}
      </div>
    </>
  );
};

export default BookActions;
