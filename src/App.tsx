import { ReactNode, Suspense, useContext } from 'react';
// import { Auth } from './components/AuthSzymon';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { AuthContext } from './context/AuthContext';
import Profile from './pages/Profile';

const App = () => {
    const { currentUser } = useContext(AuthContext);

    const RequireAuth = ({ children }: { children: ReactNode }) => {
        return currentUser ? children : <Navigate to="/login" />;
    };

    const LogIn = ({ children }: { children: ReactNode }) => {
        return !currentUser ? children : <Navigate to="/" />;
    };
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/">
                        {/* <Route index element={<Auth />} /> */}
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <Home />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <LogIn>
                                    <Login />
                                </LogIn>
                            }
                        />
                        <Route
                            path="/reagister"
                            element={
                                <LogIn>
                                    <Register />
                                </LogIn>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <LogIn>
                                    <Profile />
                                </LogIn>
                            }
                        />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
