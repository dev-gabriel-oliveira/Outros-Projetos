import { useRef } from 'react'

interface BookFormProps{
    onAddBook: any
}

export function BookForm({onAddBook}: BookFormProps) {
    const title = useRef(null);
    const author = useRef(null);
    const amazonLink = useRef(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!title.current.value || !author.current.value || !amazonLink.current.value) {
            alert('Todos os campos devem ser preenchidos!');
            return
        }
        
        if (window.confirm(`Confirma a adição de '${title.current.value}'?`)) {
            const bookTitle = title.current.value;
            const bookAuthor = author.current.value;
            const bookAmazonLink = amazonLink.current.value;
            onAddBook(bookTitle, bookAuthor, bookAmazonLink);

            title.current.value = '';
            author.current.value = '';
            amazonLink.current.value = '';
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Formulário</h3>
            <div className="mb-3">
                <input type="text" placeholder='Título do Livro' ref={title}/>
            </div>

            <div className="mb-3">
                <input type="text" placeholder='Autor' ref={author}/>
            </div>

            <div className="mb-3">
                <input type="text" placeholder='Link da Amazon' ref={amazonLink}/>
            </div>
            
            <input type="submit" value="Adicionar Livro" />
        </form>
    )
}