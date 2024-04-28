import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';

import './styles/main.scss';
import { AuthGuard } from './helpers/AuthGuard';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={
                            <AuthGuard check={true}>
                                <Dashboard />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            <AuthGuard check={false}>
                                <SignIn />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <AuthGuard check={false}>
                                <SignUp />
                            </AuthGuard>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
