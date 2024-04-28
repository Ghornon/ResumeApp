import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/main.scss';
import { Auth } from './components/Auth';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Auth />} />
					<Route path="/login" element={<div>LoginPage</div>} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
