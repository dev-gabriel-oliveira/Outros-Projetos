import React from 'react';
import { useReducer, useEffect } from 'react';
import { useAuth } from '../../../contexts/useAuth';
import { Link } from 'react-router-dom';

import { doc, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../../contexts/firebase';

import postItemReducer from './postItemReducer';

export default function PostItem({id, text, user_email, likes, dislikes, date_creation, onLikeOrDislike}) {
    const { user } = useAuth();

    // Usando, agora, Reducer para mudanças de estado
    const [state, dispatch] = useReducer(postItemReducer, {isLiked: false, isDisliked: false});

    // Verifica se o usuário corrente já curtiu o post
    async function checkIfIsLiked(){
        const q = query(collection(db, "liked"), where("post_id", "==", id), where("user_email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            dispatch({ type: 'LIKE' });
        });
    };
    // Verifica se o usuário corrente já descurtiu o post
    async function checkIfIsDisliked(){
        const q = query(collection(db, "disliked"), where("post_id", "==", id), where("user_email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            dispatch({ type: 'DISLIKE' });
        });
    };
    // Executa as verificações
    useEffect(() => {
        checkIfIsLiked();
        checkIfIsDisliked();
    },[]);

    async function handleLike(){
        if (!state.isLiked) {
            await addDoc(collection(db, "liked"), {
                post_id: id,
                user_email: user.email,
            });
            await updateDoc(doc(db, "post", id), {
                likes: likes + 1
            });
            dispatch({ type: 'LIKE' });

            if (state.isDisliked) {
                let idFromIsDisliked = null;
                const q = query(collection(db, "disliked"), where("post_id", "==", id), where("user_email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    idFromIsDisliked = doc.id
                });
                if (idFromIsDisliked) {
                    await deleteDoc(doc(db, "disliked", idFromIsDisliked));
                    await updateDoc(doc(db, "post", id), {
                        dislikes: dislikes - 1
                    });
                };
                dispatch({ type: 'UNDISLIKE' });
            }
            
            onLikeOrDislike();
        }
    }

    async function handleDislike(){
        if (!state.isDisliked) {
            await addDoc(collection(db, "disliked"), {
                post_id: id,
                user_email: user.email,
            });
            await updateDoc(doc(db, "post", id), {
                dislikes: dislikes + 1
            });
            dispatch({ type: 'DISLIKE' });

            if (state.isLiked) {
                let idFromIsLiked = null;
                const q = query(collection(db, "liked"), where("post_id", "==", id), where("user_email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    idFromIsLiked = doc.id
                });
                if (idFromIsLiked) {
                    await deleteDoc(doc(db, "liked", idFromIsLiked));
                    await updateDoc(doc(db, "post", id), {
                        likes: likes - 1
                    });
                };
                dispatch({ type: 'UNLIKE' });
            };

            onLikeOrDislike();
        }
    }

    return (
        <>
            <div className="card card-body d-inline-block m-3">
                <div className='d-grid text-start mb-1'>
                    <h5 className='fst-italic mb-2'>{text}</h5>

                    <Link><strong>{user_email}</strong></Link>
                    <p className='mb-0'>{date_creation.toDate().toLocaleString()}</p>
                    
                    <strong>{likes} Likes / {dislikes} Dislikes</strong>
                </div>

                <div className="d-flex justify-content-start input-group">
                    <button className='btn btn-primary' disabled={state.isLiked} onClick={() => {handleLike()}}>
                        <strong>Like</strong>
                    </button>
                    <button className='btn btn-danger' disabled={state.isDisliked} onClick={() => {handleDislike()}}>
                        <strong>Dislike</strong>
                    </button>
                </div>
            </div>
        </>
    )
}