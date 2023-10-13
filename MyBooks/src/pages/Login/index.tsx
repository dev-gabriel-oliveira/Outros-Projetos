import 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
      <form>
        <h3>Login</h3>
        
        <hr />
        
        <label>Username</label>
        <input type="text" placeholder='Username' />

        <label>Password</label>
        <input type="text" placeholder='Password' />

        <hr />

        <button onClick={()=>{navigate('/books')}}>Entrar</button>
      </form>
    </>
  )
}