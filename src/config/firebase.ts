import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBWSzsVjzSAWUuiFOTEENtZy53-dKF71OE',
	authDomain: 'resumeapp-eeb25.firebaseapp.com',
	projectId: 'resumeapp-eeb25',
	storageBucket: 'resumeapp-eeb25.appspot.com',
	messagingSenderId: '1064543043297',
	appId: '1:1064543043297:web:5c3e41846a797fd2af41a0',
	measurementId: 'G-WHF2HBCSG1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
