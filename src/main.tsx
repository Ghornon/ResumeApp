import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
	apiKey: 'AIzaSyBWSzsVjzSAWUuiFOTEENtZy53-dKF71OE',
	authDomain: 'resumeapp-eeb25.firebaseapp.com',
	projectId: 'resumeapp-eeb25',
	storageBucket: 'resumeapp-eeb25.appspot.com',
	messagingSenderId: '1064543043297',
	appId: '1:1064543043297:web:5c3e41846a797fd2af41a0',
	measurementId: 'G-WHF2HBCSG1',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
