import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
    };

    /*     if (loading) return <Spinner />;

    if (!user) return <Navigate to="/signin" replace={true} />; */

    return (
        <div>
            <p>Current User: {user?.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
