import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/main.scss';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>,
);
