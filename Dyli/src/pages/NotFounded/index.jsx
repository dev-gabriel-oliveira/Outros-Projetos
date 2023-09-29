import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useAuth } from '../../contexts/useAuth';


export default function NotFounded() {
  return (
    <div>
        <h1>404</h1>
        <h4>Página Não encontrada!</h4>
    </div>
  )
}