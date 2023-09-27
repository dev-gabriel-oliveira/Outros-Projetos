interface BooksListProps{
    books: any[],
    onDeleteBook: any
}

export default function BooksList({books, onDeleteBook} : BooksListProps) {
    const removeBook = (id: number) => {
        if (window.confirm('Tem certeza que quer deletar?')) {
            const updatedBooks = [...books];
            updatedBooks.splice(id, 1);
            onDeleteBook(updatedBooks);
            alert('Livro deletado com sucesso!');
        }
    }

    return (
        <section>
            <h3>Minha Biblioteca</h3>

            {books.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Título</th>
                        <th scope="col">Autor</th>
                        <th scope="col">- - - -</th>
                        <th scope="col">- - - -</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 && (
                            <>
                            {books.map((book, id) => (
                                <tr key={id}>
                                    <th scope="row">{book?.title}</th>
                                    <td>{book?.author}</td>
                                    <td><a href={book?.amazonLink}>Link Amazon</a></td>
                                    <td><a onClick={() => removeBook(id)} className="text-danger">Apagar</a></td>
                                </tr>
                            ))}
                            </>
                        )}
                    </tbody>
                </table>
            ):(
                <div className="alert alert-secondary">
                    <h4 >Lista Vazia</h4>
                    <h6>Adicione Livros</h6>
                </div>
            )}
        </section>
    )
}