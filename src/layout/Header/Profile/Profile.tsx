import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../config/firebase';
import { signOut } from 'firebase/auth/cordova';
const Profile = () => {
    const [user] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
    };
    return (
        <div>
            <p>Current User: {user?.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Profile;
