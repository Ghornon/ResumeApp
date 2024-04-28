import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { dispatch } = useContext(AuthContext);

    const handleLogin = async () => {

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: unknown) => {
                const user = userCredential.user;
                dispatch({ type: 'LOGIN', payload: user });
            })
            .catch((error: unknown) => {
                const errorCode = error.code;
                const errorMes = error.message;
                console.warn(`ErrorCode: ${errorCode}, ErrorMes: ${errorMes}`);
            });
    };

    return (
        <div className="h-vh-100 flex flex-col items-center justify-center">
            <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="h-[40px]"
            />
            <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="h-[40px]"
            />
            <button onClick={handleLogin} type="submit">Sign in</button>
        </div>
    );
};

export default Login;
