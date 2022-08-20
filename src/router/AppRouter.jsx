import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import MainTemplate from '../layouts/MainTemplate';

import PreLoginTemplate from '../layouts/PreLoginTemplate';

import Login from '../screens/Auth/login';

import Home from '../screens/Home/home';

import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
    return (
        <Routes>

            <Route index
                element={
                    <PreLoginTemplate>
                        <Login />
                    </PreLoginTemplate>
                }
            />

            <Route path="/home" element={
            <MainTemplate>
                <Home/>
                 </MainTemplate>
                }>
               
            </Route>


            <Route path="/"
                element={
                    <PreLoginTemplate>
                        <Login />
                    </PreLoginTemplate>
                }
            />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    )
}


export default AppRouter;


const NotFound = () => {
    return (
        <div>404</div>
    )
}

