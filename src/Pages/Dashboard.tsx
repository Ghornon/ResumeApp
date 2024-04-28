import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
    };

    if (loading) return <Spinner />;

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
