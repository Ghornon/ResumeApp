import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from '../components/Spinner';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { Alert, Grid } from '@mui/material';

export const AuthGuard = ({ children, check }: { children: React.ReactNode; check: boolean }) => {
    const [user, loading, authStateError] = useAuthState(auth);

    if (loading) return <Spinner />;

    if (authStateError)
        return (
            <Grid container spacing={2} minHeight={'100vh'}>
                <Grid display="flex" justifyContent="center" alignItems="center">
                    <Alert variant="filled" severity="error">
                        {authStateError.message}
                    </Alert>
                </Grid>
            </Grid>
        );

    if (check) return user ? children : <Navigate to="/signin" replace={true} />;

    return !user ? children : <Navigate to="/" replace={true} />;
};
