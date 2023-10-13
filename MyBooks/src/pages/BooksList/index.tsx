import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Book {
    id: number;
    title: string;
    author: string;
    amazonLink: string;
    isRead: boolean;
}

export default function BooksList() {
    const navigate = useNavigate();

    const [ books, setBooks ] = useState<Book[]>([]);

    useEffect(() => {
        // Função para buscar os livros do servidor JSON
        const getBooks = async () => {
            try {
                const response = await fetch('http://localhost:3001/books');
                if (response.ok) {
                    const data = await response.json();
                    setBooks(data);
                }
            } catch (error) {
                console.error('Erro ao buscar os livros:', error);
            }
        };

        getBooks(); // Chama a função de busca quando o componente é montado
    }, []);

    // Muda o Status do Livro
    const toggleReadStatus = async (id: number, isRead: boolean) => {
        try {
            const response = await fetch(`http://localhost:3001/books/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isRead: !isRead }),
            });

            if (response.ok) {
                const updatedBooks = books.map((book) => {
                    if (book.id === id) {
                        return { ...book, isRead: !isRead };
                    }
                    return book;
                });

                setBooks(updatedBooks);
            } else {
                alert('Erro ao atualizar o status de leitura do livro.');
            }
        } catch (error) {
            console.error('Erro ao atualizar o status de leitura do livro:', error);
        }
    };

    // Remove um livro
    const removeBook = async (id: number) => {
        if (window.confirm('Tem certeza que quer deletar?')) {
            try {
                const response = await fetch(`http://localhost:3001/books/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    // Atualiza a lista de livros no estado após a exclusão bem-sucedida
                    setBooks(books.filter(book => book.id !== id));
                    alert('Livro deletado com sucesso!');
                } else {
                    alert('Erro ao deletar o livro.');
                }
            } catch (error) {
                console.error('Erro ao remover o livro:', error);
            }
        }
    }

    return (
        <section>
            <div>
                <h1>My Books</h1>
                <button
                    onClick={() => {navigate('/form')}}
                >
                    <strong>Adicionar</strong>
                </button>
                <hr />
            </div>

            {books.length > 0 ? (
                <table className="table border">
                    <thead>
                        <tr>
                        <th scope="col">Título</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Status</th>
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
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={book.isRead}
                                            onChange={() => toggleReadStatus(book.id, book.isRead)}
                                        />
                                        {book?.isRead ? " Lido" : " Não Lido"}
                                    </td>
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