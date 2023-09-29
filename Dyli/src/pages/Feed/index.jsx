import { Link, useNavigate } from 'react-router-dom';

import PostsList from '../components/PostsList';

export default function Feed() {
    const navigate = useNavigate();

    return (
        <>
            <div className="d-flex justify-content-between mx-5">
                <h1>Feed</h1>
                <button
                    className='btn btn-primary'
                    onClick={() => {navigate('/form')}}
                >
                    <strong>Criar Postagem</strong>
                </button>
            </div>

            <hr />

            <PostsList />

            <hr />
        </>
    )
}