import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import BasketItem from './BasketItem';
import { fetchBasketByUser } from '../../http/basketAPI';
import { Context } from '../../index';

const BasketList = observer(() => {
	const { user } = useContext(Context);
	const [devices, setDevices] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		fetchBasketByUser(user.user.id).then((data) => setDevices(data));
	}, []);

	const calculateTotalPrice = (price) => {
		if (!price) {
			return;
		}
		setTotalPrice(totalPrice + price);
	};

	return (
		<>
			<h1 className='text-center'>Корзина</h1>
			<div>
				{devices.map((device) => (
					<BasketItem
						key={device.deviceId}
						deviceId={device.deviceId}
						calculateTotalPrice={calculateTotalPrice}
					/>
				))}
			</div>
			<div>
				<h1>{totalPrice}</h1>
			</div>
		</>
	);
});

export default BasketList;
