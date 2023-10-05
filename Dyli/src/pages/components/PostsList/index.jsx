import { useEffect, useReducer } from 'react';

import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../contexts/firebase';

import PostItem from '../PostItem';
import postsListReducer from './postsListReducer';

export default function PostsList() {
    const [state, dispatch] = useReducer(postsListReducer, {posts: []});

    async function getAllPosts(){
        const postsArray = [];

        const q = query(collection(db, "post"), orderBy("date_creation", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            postsArray.push({id: doc.id, ...doc.data()})
        });
        
        dispatch({ type: 'SET_POSTS', payload: postsArray });
    };

    useEffect(() => {
        getAllPosts()
    },[]);

    return (
        <div className='d-flex flex-wrap justify-content-center'>
            {state.posts.length > 0 ? (
                <>
                {state.posts.map((post, id) => (
                    <PostItem
                        key={id}
                        id={post.id}
                        text={post.text}
                        user_email={post.user_email}
                        likes={post.likes}
                        dislikes={post.dislikes}
                        date_creation={post.date_creation}
                        onLikeOrDislike={() => {getAllPosts()}}
                    />
                ))}
                </>
            ) : (
                <div className="card card-body">
                    <h4>Não há posts ainda.</h4>
                    <strong>Comece a postar e compartilhe.</strong>
                </div>
            )}
        </div>
    )
}