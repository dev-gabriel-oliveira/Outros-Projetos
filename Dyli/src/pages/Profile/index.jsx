import { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import { useAuth } from '../../contexts/useAuth';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
    const { user, signout } = useAuth();

    const navigate = useNavigate();

    const logout = () => {
        // Sai da conta Google e Anula o Usuário guardado
        googleLogout();
        signout();

        // Volta para tela de Login
        navigate('/');

        alert('Você saiu da Conta');
    }

    return (
        <>
            <img src={user?.picture} alt="" />
            <h1>{user?.username}</h1>
            <p>{user?.email}</p>

            <button
                className='btn btn-danger'
                onClick={() => logout()}
            >
                Sair da Conta
            </button>
        </>
    )
}