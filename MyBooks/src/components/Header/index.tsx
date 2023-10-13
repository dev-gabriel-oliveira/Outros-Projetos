
import { NavLink } from 'react-router-dom';
import './style.css';

export default function Header() {
  return (
    <header>
        <nav>
            <ul>
                <li>
                    <NavLink to={'/books'}>Books</NavLink>
                </li>

                <li>
                    <NavLink to={'/profile'}>Profile</NavLink>
                </li>

                <li>
                    <NavLink to={'/about'}>About</NavLink>
                </li>

                <li>
                    <NavLink to={'/'}>Login</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}