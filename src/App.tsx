import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthGuard } from './helpers/AuthGuard';
import { Spinner } from './components/Spinner';
import NotFound from './pages/NotFound';
const SignIn = lazy(()=>import('./pages/SignIn'))
const SignUp = lazy(() => import('./pages/SignUp'));
const MainLayout = lazy(() => import('./layout/MainLayout'));
const Dashboard = lazy(()=>import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'));
const CVMaker = lazy(() => import('./pages/CVMaker/CVMaker'));
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

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
