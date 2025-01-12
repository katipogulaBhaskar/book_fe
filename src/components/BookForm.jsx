import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated to useNavigate
//import "./BookForm.css"; // Import this ONLY in the BookForm component
const BookForm = () => {
  const [book, setBook] = useState({ title: "", author: "" });
  const [books, setBooks] = useState([]); // To store the list of books
  const [showBooks, setShowBooks] = useState(false); // To toggle visibility of the books list
  const [editBook, setEditBook] = useState(null); // Store the book being edited
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const navigate = useNavigate(); // For redirecting

  // Handle input field changes for both adding and editing books
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Handle the form submission to add a new book or update an existing one
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    try {
      if (editBook) {
        // Update existing book if editBook is set
        const response = await axios.put(
          `http://localhost:5000/api/books/${editBook._id}`, // Using book _id for the update
          book
        );
        if (response.data.message === "Book updated successfully") {
          alert("Book updated successfully!");
          setEditBook(null); // Reset edit mode
        } else {
          alert(response.data.message || "Failed to update book. Try again.");
        }
      } else {
        // Add new book
        const response = await axios.post(
          "http://localhost:5000/api/books",
          book
        );
        if (response.data.message === "Book added successfully") {
          alert("Book added successfully!");
        } else {
          alert(response.data.message || "Failed to add book. Try again.");
        }
      }

      // Reset the book form and fetch all books
      setBook({ title: "", author: "" });
      fetchAllBooks(); // Fetch the updated list of books
    } catch (err) {
      console.error(err);
      alert("Error adding or updating book.");
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  // Fetch all books
  const fetchAllBooks = async () => {
    setLoading(true); // Set loading to true while fetching books
    try {
      const response = await axios.get("http://localhost:5000/api/get_books");
      setBooks(response.data);
      setShowBooks(true); // Show books list after fetching
    } catch (err) {
      console.error(err);
      alert("Error fetching books.");
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  // Handle editing a book
  const handleEdit = (book) => {
    setBook({ title: book.title, author: book.author });
    setEditBook(book); // Set the book to be edited
  };

  // Handle deleting a book
  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setLoading(true); // Set loading to true when deleting
      try {
        const response = await axios.delete(`http://localhost:5000/api/books/${bookId}`);
        if (response.data.message === "Book deleted successfully") {
          alert("Book deleted successfully!");
          fetchAllBooks(); // Fetch updated list after deletion
        } else {
          alert(response.data.message || "Failed to delete book. Try again.");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting book.");
      } finally {
        setLoading(false); // Set loading to false after the delete request
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear the user from localStorage
    alert("You have logged out successfully.");
    navigate("/login"); // Redirect to login page
  };

  // Fetch the books when the component mounts
  useEffect(() => {
    fetchAllBooks();
  }, []); // Empty dependency array ensures this runs only once when the component is mounted

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editBook ? "Edit Book" : "Add a Book"}</h2>
        <input
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Book Author"
          value={book.author}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editBook ? "Update Book" : "Add Book"}
        </button>
      </form>

      {/* Button to fetch all books */}
      <button onClick={fetchAllBooks} disabled={loading}>
        {loading ? "Loading..." : "All Books"}
      </button>

      {/* Display all books */}
      {showBooks && (
        <div>
          <h3>Books List</h3>
          <ol>
            {books.length > 0 ? (
              books.map((book) => (
                <li key={book._id}>
                  <strong>Title:</strong> {book.title} <br />
                  <strong>Author:</strong> {book.author} <br />
                  {/* Edit and Delete buttons */}
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book._id)}>Delete</button>
                </li>
              ))
            ) : (
              <p>No books available.</p>
            )}
          </ol>
        </div>
      )}

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default BookForm;
