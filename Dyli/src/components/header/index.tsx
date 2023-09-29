import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Header() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src='/icon.png' alt="" width={'45rem'} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/feed" className="nav-link">Feed</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">Sobre</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}