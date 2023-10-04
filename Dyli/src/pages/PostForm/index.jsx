import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../contexts/firebase';

export default function PostForm() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const textInput = useRef();

    async function handleSubmit() {
        if (textInput.current.value) {
            await addDoc(collection(db, "post"), {
                text: textInput.current.value,
                user_email: user.email,
                likes: 0,
                dislikes: 0,
                date_creation: new Date,
            });
            navigate("/feed");
            return alert("Post adicionado com sucesso!");
        }
        
        return alert("Escreva algo para postar!");
    }

    return (
        <>
            <h4 className='text-start fst-italic'>
                Escrever é dar asas ao pensar.
                <br />
                Mas, pense bem antes de escrever.
            </h4>

            <hr />

            <form>
                <textarea
                    className='form-control'
                    placeholder="Digite o que você está pensando..."
                    maxLength="200"
                    ref={textInput}
                />
                <p className='text-start fst-italic p-2'>Limite de 200 caracteres</p>
            </form>

            <hr />

            <button
                className="btn btn-primary"
                onClick={() => {handleSubmit()}}
            >
                Postar
            </button>
        </>
    )
}