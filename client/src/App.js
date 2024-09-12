import React, { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/router/AppRouter';
import NavBar from './components/navbar/NavBar';
import { observer } from 'mobx-react-lite';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
	const { user } = useContext(Context);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		check()
			.then((data) => {
				user.setUser(data);
				user.setIsAuth(true);
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <Spinner animation='grow' />;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	);
});

export default App;
