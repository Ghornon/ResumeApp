import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from '../components/Spinner';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import ErrorSnackbar from '../components/ErrorSnackbar';

export const AuthGuard = ({ children, check }: { children: React.ReactNode; check: boolean }) => {
    const [user, loading, authStateError] = useAuthState(auth);

    if (loading) return <Spinner />;

    if (authStateError) return <ErrorSnackbar>{authStateError.message}</ErrorSnackbar>;

    if (check) return user ? children : <Navigate to="/signin" replace={true} />;

    return !user ? children : <Navigate to="/" replace={true} />;
};
