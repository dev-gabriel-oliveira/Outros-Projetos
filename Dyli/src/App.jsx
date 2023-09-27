import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import './App.css';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null)
  return (
    <GoogleOAuthProvider clientId="806327805056-qgm85redbtegq9opghg3lrtumhsqs4f0.apps.googleusercontent.com">
      {user && (
        <>
        <h1>Bem vindo, {user?.name}!</h1>
        <p>{user?.email}</p>
        <img src={user?.picture} alt="" srcset="" />
        </>
      )}
      <GoogleLogin
        onSuccess={credentialResponse => {
          let decoded = jwt_decode(credentialResponse.credential)
          setUser(decoded)
          console.log(decoded);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  )
}

export default App
