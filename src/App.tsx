import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import { AuthGuard } from './helpers/AuthGuard';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Spinner } from './components/Spinner';
import { purple } from '@mui/material/colors';
import MainLayout from './layout/MainLayout';
import CVMaker from './pages/CVMaker/CVMaker';

const defaultTheme = createTheme({
    palette: {
        secondary: {
            main: purple[700],
        },
    },
});

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={defaultTheme}>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/">
                            <Route
                                path="/"
                                element={
                                    <AuthGuard check={true}>
                                        <MainLayout />
                                    </AuthGuard>
                                }>
                                <Route index element={<Dashboard />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/cvmaker" element={<CVMaker />} />
                            </Route>
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
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </Suspense>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
