import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { dispatch } = useContext(AuthContext);
    const logout = async () => {
        dispatch({ type: 'LOGOUT' });
        await signOut(auth).catch((error: unknown) => {
            const errorCode = error.code;
            const errorMes = error.message;
            console.warn(`ErrorCode: ${errorCode}, ErrorMes: ${errorMes}`);
        });
    };
    const [user] = useAuthState(auth);
    return (
        <div className="p-2">
            <h1>Welcome Home!!!</h1>
            <div>
                <p>Current User: {user?.email}</p>
                <button
                    className="bg-black text-white
                p-2 rounded-md"
                    onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
