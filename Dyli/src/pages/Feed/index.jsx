import { useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { Link } from 'react-router-dom';

import PostsList from '../components/PostsList';

export default function Feed() {
    const { user } = useAuth();

    return (
        <>
            <div className="d-flex justify-content-between mx-5">
                <h1>Feed</h1>
                <button className='btn btn-primary'>
                    <strong>Criar Postagem</strong>
                </button>
            </div>

            <hr />

            <PostsList />

            <hr />
        </>
    )
}