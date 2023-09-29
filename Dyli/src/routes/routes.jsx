import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth.js';

import Login from '../pages/Login/index.jsx';
import NotFounded from '../pages/NotFounded/index.jsx';
import Feed from '../pages/Feed/index.jsx';
import Profile from '../pages/Profile/index.jsx';
import PostForm from '../pages/PostForm/index.jsx';

const Private = ({ Logged }) => {
    const { signed } = useAuth();
    const location = useLocation().pathname;

    if (signed) {
        if (location === "/") {
            return <Feed />
        }
        return <Logged />
    } else {
        return <Login />
    }
};

export default function AppRoutes() {
    return (
        <main>
            <Routes>
                <Route path='*' element={<Private Logged={NotFounded}/>}/>
                <Route path='' element={<Private Logged={Login}/>}/>
                <Route path='/feed' element={<Private Logged={Feed}/>}/>
                <Route path='/profile' element={<Private Logged={Profile}/>}/>
                <Route path='/form' element={<Private Logged={PostForm}/>}/>
            </Routes>
        </main>
    )
};
