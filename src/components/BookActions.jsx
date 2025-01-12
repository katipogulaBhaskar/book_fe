import React, { useState } from "react";
import AddBookForm from "./BookForm.jsx";  // Assuming BookForm is the Add Book form
// import BorrowBookForm from "./BorrowForm.jsx";  // Assuming BorrowForm is the Borrow Book form

const BookActions = () => {
  const [activeForm, setActiveForm] = useState("");  // To toggle between Add and Borrow form

  // Function to show Add Book form
  const showAddBookForm = () => {
    setActiveForm("add");
  };

  // Function to show Borrow Book form
  const showBorrowBookForm = () => {
    setActiveForm("borrow");
  };

  return (
    <div>
      <h2>Book Actions</h2>
      
      {/* Buttons to toggle between Add Book and Borrow Book forms */}
      <div>
        <button onClick={showAddBookForm}>Add Book</button>
        {/* <button onClick={showBorrowBookForm}>Borrow Book</button> */}
      </div>
      
      {/* Conditionally rendering Add Book or Borrow Book form */}
      {activeForm === "add" && <AddBookForm />}
      {/* {activeForm === "borrow" && <BorrowBookForm />} */}
    </div>
  );
};

export default BookActions;
