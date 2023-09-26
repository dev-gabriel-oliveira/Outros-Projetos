import { useState } from 'react'
import './App.css'
import { BookForm } from './components/BookForm'
import BooksList from './components/BookList';

export default function App() {
  const [books, setBooks] = useState([]);

  const handleAddBook = (bookTitle: string, bookAuthor: string, bookAmazonLink: string) => {
    const newBook = {
      title: bookTitle,
      author: bookAuthor,
      amazonLink: bookAmazonLink
    }

    setBooks([...books, newBook]);
  };

  const handleDeleteBook = (updatedBooks: any) => {
    setBooks(updatedBooks);
  };

  return (
    <>
      <h1>My Books</h1>

      <main>
        <BookForm onAddBook={handleAddBook}/>
        <br />
        <BooksList books={books} onDeleteBook={handleDeleteBook} />
      </main>
    </>
  )
}