interface BooksListProps{
    books: any[],
    onDeleteBook: any
}

export default function BooksList({books, onDeleteBook} : BooksListProps) {
    const removeBook = (id) => {
        if (window.confirm('Tem certeza que quer deletar?')) {
            const updatedBooks = [...books];
            updatedBooks.splice(id, 1);
            onDeleteBook(updatedBooks);
            alert('Livro deletado com sucesso!');
        }
    }

    return (
        <ul>
            <h3>Minha Biblioteca</h3>
            {books.length > 0 ? (
                <>
                {books.map((book, id) => (
                    <li className="border" key={id}>
                        <p>{book?.title}</p>
                        <p>{book?.author}</p>
                        <a href={book?.amazonLink}>Link Amazon</a>
                        <a onClick={() => removeBook(id)} className="text-danger">Apagar</a>
                    </li>
                ))}
                </>
            ):(
                <>
                <div className="alert alert-secondary">
                    <h4 >Lista Vazia</h4>
                    <h6>Adicione Livros</h6>
                </div>
                </>
            )}
            
        </ul>
    )
}