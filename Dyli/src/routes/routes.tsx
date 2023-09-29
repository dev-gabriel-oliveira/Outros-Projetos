import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import NotFounded from '../pages/NotFounded';
import Feed from '../pages/Feed';
import Profile from '../pages/Profile';

export default function AppRoutes() {
    return (
        <main>
            <Routes>
                <Route path='*' element={<NotFounded/>}/>
                <Route path='' element={<Login/>}/>
                <Route path='/feed' element={<Feed/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </main>
    )
};
