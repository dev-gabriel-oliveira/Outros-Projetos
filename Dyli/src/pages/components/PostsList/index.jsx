import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/useAuth';
import { Link } from 'react-router-dom';

import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../contexts/firebase';

import PostItem from '../PostItem';

export default function PostsList() {
    const [ posts, setPosts ] = useState([]);

    async function getAllPosts(){
        const postsArray = [];
        const query = await getDocs(collection(db, "post"));

        query.forEach((doc) => {
            postsArray.push({id: doc.id, ...doc.data()})
        });

        console.log(postsArray);
        setPosts(postsArray);
    };

    useEffect(() => {
        getAllPosts()
    },[]);

    return (
        <div className='d-flex flex-wrap justify-content-evenly'>
            {posts.length > 0 && (
                <>
                {posts.map((post, id) => (
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
            )}
        </div>
    )
}