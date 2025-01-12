import React, { useState, useEffect } from "react";
import axios from "axios";

const BorrowForm = () => {
  const [books, setBooks] = useState([]);  // Store books fetched from the backend
  const [selectedBook, setSelectedBook] = useState("");
  const [message, setMessage] = useState("");
  const [showBorrowedBooks, setShowBorrowedBooks] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Fetch available books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get_books"); // API to fetch all books
        setBooks(response.data);  // Set the fetched books to state
      } catch (err) {
        console.error(err);
        alert("Error fetching books.");
      }
    };

    fetchBooks();
  }, []);  // Empty dependency array means this runs once when the component mounts

  // Handle book selection
  const handleChange = (e) => {
    setSelectedBook(e.target.value);
  };

  // Handle borrow book form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBook) {
      alert("Please select a book to borrow.");
      return;
    }

    const userId = localStorage.getItem("userId");  // Retrieve userId from localStorage

    if (!userId) {
      alert("Please log in to borrow a book.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/borrow",
        { bookId: selectedBook, userId },  // Include userId in the request
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Book borrowed successfully") {
        alert("Book borrowed successfully!");
        setMessage(response.data.message);
      } else {
        alert("Failed to borrow book. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error borrowing book.");
    }
  };

  // Fetch borrowed books
  const fetchBorrowedBooks = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please log in to view borrowed books.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/borrowed?userId=${userId}`);
      setBorrowedBooks(response.data);
      setShowBorrowedBooks(true); // Display borrowed books after fetching
    } catch (err) {
      console.error(err);
      alert("Error fetching borrowed books.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Borrow a Book</h2>
        {message && <p>{message}</p>}
        <select name="book" value={selectedBook} onChange={handleChange} required>
          <option value="">Select a Book</option>
          {/* Map through the books fetched from the backend and display them in the select dropdown */}
          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title} by {book.author}
            </option>
          ))}
        </select>
        <button type="submit">Borrow Book</button>
      </form>

      {/* Button to fetch and display borrowed books */}
      <button onClick={fetchBorrowedBooks}>View Borrowed Books</button>

      {/* Display borrowed books */}
      {showBorrowedBooks && (
        <div>
          <h3>Borrowed Books List</h3>
          <ol>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((borrowed) => (
                <li key={borrowed._id}>
                  <strong>Title:</strong> {borrowed.bookId.title} <br />
                  <strong>Author:</strong> {borrowed.bookId.author} <br />
                </li>
              ))
            ) : (
              <p>No books borrowed yet.</p>
            )}
          </ol>
        </div>
      )}
    </div>
  );
};

export default BorrowForm;
