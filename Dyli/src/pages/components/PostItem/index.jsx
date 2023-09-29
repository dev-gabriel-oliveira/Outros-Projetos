import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/useAuth';
import { Link } from 'react-router-dom';

import { doc, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../../contexts/firebase';

export default function PostItem({id, text, user_email, likes, dislikes, date_creation, onLikeOrDislike}) {
    const { user } = useAuth();

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    // Verifica se o usuário corrente já curtiu o post
    async function checkIfIsLiked(){
        const q = query(collection(db, "liked"), where("post_id", "==", id), where("user_email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setIsLiked(true);
        });
    };
    // Verifica se o usuário corrente já descurtiu o post
    async function checkIfIsDisliked(){
        const q = query(collection(db, "disliked"), where("post_id", "==", id), where("user_email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setIsDisliked(true);
        });
    };
    // Executa as verificações
    useEffect(() => {
        checkIfIsLiked();
        checkIfIsDisliked();
    },[]);

    async function handleLike(){
        if (!isLiked) {
            await addDoc(collection(db, "liked"), {
                post_id: id,
                user_email: user.email,
            });
            await updateDoc(doc(db, "post", id), {
                likes: likes + 1
            });
            setIsLiked(true);

            if (isDisliked) {
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
                setIsDisliked(false);
            }
            
            onLikeOrDislike();
        }
    }

    async function handleDislike(){
        if (!isDisliked) {
            await addDoc(collection(db, "disliked"), {
                post_id: id,
                user_email: user.email,
            });
            await updateDoc(doc(db, "post", id), {
                dislikes: dislikes + 1
            });
            setIsDisliked(true);

            if (isLiked) {
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
                setIsLiked(false);
            };

            onLikeOrDislike();
        }
    }

    return (
        <>
            <div className="card card-body d-inline-block mx-5 my-3">
                <div className='d-grid text-start mb-1'>
                    <h5 className='mb-2'>{text}</h5>

                    <Link><strong>{user_email}</strong></Link>
                    <p className='mb-0'>{date_creation.toDate().toLocaleString()}</p>
                    
                    <strong>{likes} Likes / {dislikes} Dislikes</strong>
                </div>

                <div className="d-flex justify-content-start input-group">
                    <button className='btn btn-primary' disabled={isLiked} onClick={() => {handleLike()}}>
                        <strong>Like</strong>
                    </button>
                    <button className='btn btn-danger' disabled={isDisliked} onClick={() => {handleDislike()}}>
                        <strong>Dislike</strong>
                    </button>
                </div>
            </div>
        </>
    )
}