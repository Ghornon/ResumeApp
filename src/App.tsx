import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import { AuthGuard } from './helpers/AuthGuard';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
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
                        <Route
                            path="/profile"
                            element={
                                <AuthGuard check={true}>
                                    <Profile />
                                </AuthGuard>
                            }
                        />

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
