import { useAuth } from '../../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import './style.css';

export default function Login() {
  const { signin } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <h1>Do you like it?</h1>

      <p>Dê letras aos seus pensamentos</p>

      <GoogleLogin
        className='btn btn-primary'
        onSuccess={credentialResponse => {
          // Recebe os dados do Usuário e Converte-os
          let userData = jwt_decode(credentialResponse.credential);
          
          // Guarda os dados do Usuário Localmente
          signin(userData?.email, userData?.given_name, userData?.picture);

          // Redireciona para a página de Posts
          navigate('/feed');
          
          alert('Login Bem-Sucedido!');
        }}
        onError={() => {
          alert('Login Malsucedido!');
        }}
      />
    </>
  )
}