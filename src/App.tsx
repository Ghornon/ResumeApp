import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthGuard } from './helpers/AuthGuard';
import { Spinner } from './components/Spinner';
import NotFound from './pages/NotFound';
// Const SignIn = lazy(() => import('./pages/SignIn'));
// Const SignUp = lazy(() => import('./pages/SignUp'));
const AuthForms = lazy(() => import('./pages/AuthForm/AuthForms'));
const MainLayout = lazy(() => import('./layout/MainLayout'));
const FullPageLayout = lazy(() => import('./layout/FullPageLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DocumentTabPanel = lazy(() => import('./pages/DocumentTabPanel'));
const Profile = lazy(() => import('./pages/Profile'));
const Editor = lazy(() => import('./pages/Editor'));
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
                                    <AuthGuard authorized={true}>
                                        <MainLayout />
                                    </AuthGuard>
                                }>
                                <Route index element={<Dashboard />} />
                                <Route path="/resumes" element={<DocumentTabPanel />} />
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                            <Route
                                path="/editor"
                                element={
                                    <AuthGuard authorized={true}>
                                        <FullPageLayout />
                                    </AuthGuard>
                                }>
                                <Route index element={<NotFound />} />
                                <Route path=":resumeId" element={<Editor />} />
                            </Route>
                            <Route
                                path="/signin"
                                element={
                                    <AuthGuard authorized={false}>
                                        {/* <SignIn/> */}
                                        <AuthForms />
                                    </AuthGuard>
                                }
                            />
                            <Route
                                path="/signup"
                                element={
                                    <AuthGuard authorized={false}>
                                        {/* <SignUp/> */}
                                        <AuthForms />
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
