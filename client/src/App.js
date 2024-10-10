import React, { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/router/AppRouter';
import NavBar from './components/navbar/NavBar';
import { observer } from 'mobx-react-lite';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import { fetchBasketByUser } from './http/basketAPI';
import { fetchDeviceById } from './http/deviceAPI';

const App = observer(() => {
	const { user } = useContext(Context);
	const { basket } = useContext(Context);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		check()
			.then((data) => {
				user.setUser(data);
				if (data === null) {
					user.setIsAuth(false);
				} else {
					user.setIsAuth(true);

					fetchBasketByUser(data.id).then((data) => {
						if (JSON.stringify(data) !== JSON.stringify(basket.basket)) {
							basket.setBasket(data);
							basket.setPrice(0);
							basket.basket.map((device) => {
								fetchDeviceById(device.deviceId).then((data) => {
									basket.addDevice(data);
									basket.setPrice(data.price + basket.price);
								});
							});
						}
					});
				}
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
