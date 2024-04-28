import { createContext, ReactNode, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    const [, loading] = useAuthState(auth);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.currentUser));
    }, [state.currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
            {!loading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};
