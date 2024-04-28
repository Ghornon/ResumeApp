import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
    };

    if (loading)
        return (
            <Grid container spacing={2} minHeight={'100vh'}>
                <Grid xs display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Grid>
            </Grid>
        );

    if (!user) return <Navigate to="/signin" replace={true} />;

    return (
        <div>
            <p>Current User: {user.email}</p>
            <button onClick={logout}>Logout</button>
            {error ? error.message : ''}
        </div>
    );
};

export default Dashboard;
