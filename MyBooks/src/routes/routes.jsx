import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login/index.tsx';
import NotFounded from '../pages/NotFounded/index.tsx';
import BookForm from '../pages/BookForm/index.tsx';
import BooksList from '../pages/BooksList/index.tsx';
import About from '../pages/About/index.tsx';


export default function AppRoutes() {
    return (
        <main>
            <Routes>
                <Route path='' element={<Login />}/>
                <Route path='/books' element={<BooksList />}/>
                <Route path='/form' element={<BookForm />}/>
                <Route path='/about' element={<About />}/>
                <Route path='*' element={<NotFounded />}/>
            </Routes>
        </main>
    )
};
