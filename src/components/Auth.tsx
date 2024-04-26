import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useState } from 'react';

export const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, loading, error] = useAuthState(auth);

	const signUp = async () => {
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			const user = res.user;
			await addDoc(collection(db, 'users'), {
				uid: user.uid,
				authProvider: 'local',
				email,
			});
		} catch (err) {
			console.error(err);
		}
	};

	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		signOut(auth);
	};

	if (loading) {
		return (
			<div>
				<p>Initialising User...</p>
			</div>
		);
	}
	if (error) {
		return (
			<div>
				<p>Error</p>
			</div>
		);
	}
	if (user) {
		return (
			<div>
				<p>Current User: {user.email}</p>
				<button onClick={logout}>Logout</button>
			</div>
		);
	}
	return (
		<div>
			<input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
			<input
				placeholder="Password"
				type="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={signUp}>Sign up</button>
			<button onClick={signIn}>Sign in</button>
		</div>
	);
};
