import { useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookForm() {
    const navigate = useNavigate();

    const title = useRef<HTMLInputElement | null>(null);
    const author = useRef<HTMLInputElement | null>(null);
    const amazonLink = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const bookTitle = title.current?.value;
        const bookAuthor = author.current?.value;
        const bookAmazonLink = amazonLink.current?.value;

        if (!bookTitle || !bookAuthor || !bookAmazonLink) {
            alert('Todos os campos devem ser preenchidos!');
            return;
        }

        if (window.confirm(`Confirma a adição de '${bookTitle}'?`)) {
            try {
                const response = await fetch('http://localhost:3001/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: bookTitle,
                        author: bookAuthor,
                        amazonLink: bookAmazonLink,
                        isRead: false,
                    }),
                });

                if (response.ok) {
                    alert('Livro adicionado com sucesso!');
                    title.current!.value = '';
                    author.current!.value = '';
                    amazonLink.current!.value = '';
                    navigate('/books');
                } else {
                    alert('Erro ao adicionar o livro.');
                }
            } catch (error) {
                console.error('Erro ao adicionar o livro:', error);
                alert('Erro ao adicionar o livro.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Formulário</h3>

            <hr />

            <label>Título do Livro</label>
            <input type="text" placeholder='Título do Livro' ref={title}/>

            <label>Autor</label>
            <input type="text" placeholder='Autor' ref={author}/>

            <label>Link da Amazon</label>
            <input type="text" placeholder='Link da Amazon' ref={amazonLink}/>

            <hr />
            
            <button type='submit'>Adicionar Livro</button>
        </form>
    )
}