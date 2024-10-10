import React, { useState, useEffect, useContext } from 'react';
import BasketList from '../components/basket/BasketList';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import '../assets/price.css';

const Basket = observer(() => {
	const { basket } = useContext(Context);
	const { user } = useContext(Context);
	const [devices, setDevices] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		setDevices(basket.devices);
		setTotalPrice(basket.price);
	}, [basket.devices, basket.price]);

	return (
		<>
			<h1 className='text-center'>Корзина</h1>
			<div className='d-flex'>
				<BasketList devices={devices} user={user} basket={basket} />
				<div className='price__block'>
					<h1>
						Сумма:
						<br />
						<div className='price__block_total'>{totalPrice} руб.</div>
						<Button variant='dark' className='mt-3 ms-3'>
							Оформить заказ
						</Button>
					</h1>
				</div>
			</div>
		</>
	);
});

export default Basket;
