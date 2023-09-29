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
        const timestampNow = Date.now();
        const currentTimestamp = new Date(timestampNow);
        await addDoc(collection(db, "post"), {
            text: textInput.current.value,
            user_email: user.email,
            likes: 0,
            dislikes: 0,
            date_creation: currentTimestamp,
        });
        navigate("/feed");
        alert("Post adicionado com sucesso!");
    }

    return (
        <>
            <h1>Formulário</h1>

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