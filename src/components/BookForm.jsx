import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookForm = () => {
  const [book, setBook] = useState({ title: "", author: "" });
  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editBook) {
        const response = await axios.put(
          `http://localhost:5000/api/books/${editBook._id}`,
          book
        );
        alert(response.data.message || "Book updated successfully!");
        setEditBook(null);
      } else {
        const response = await axios.post("http://localhost:5000/api/books", book);
        alert(response.data.message || "Book added successfully!");
      }

      setBook({ title: "", author: "" });
      fetchAllBooks();
    } catch (err) {
      console.error(err);
      alert("Error adding or updating book.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/get_books");
      setBooks(response.data);
      setShowBooks(true);
    } catch (err) {
      console.error(err);
      alert("Error fetching books.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setBook({ title: book.title, author: book.author });
    setEditBook(book);
  };

  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setLoading(true);
      try {
        const response = await axios.delete(`http://localhost:5000/api/books/${bookId}`);
        alert(response.data.message || "Book deleted successfully!");
        fetchAllBooks();
      } catch (err) {
        console.error(err);
        alert("Error deleting book.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("You have logged out successfully.");
    navigate("/login");
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <div className="container">
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

      <button onClick={fetchAllBooks} disabled={loading}>
        {loading ? "Loading..." : "Show All Books"}
      </button>

      {showBooks && (
        <div className="books-list">
          <h3>Books List</h3>
          <ol>
            {books.length > 0 ? (
              books.map((book) => (
                <li key={book._id}>
                  <strong>Title:</strong> {book.title} <br />
                  <strong>Author:</strong> {book.author} <br />
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

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default BookForm;
