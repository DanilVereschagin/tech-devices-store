import React, { useEffect, useState } from 'react';
import { fetchBrandById } from '../../http/deviceAPI';
import { DEVICE_ROUTE } from '../../utils/consts';
import star from '../../assets/star.png';
import { useNavigate } from 'react-router-dom';
import { Col, Card, Image, Button } from 'react-bootstrap';
import classes from './Basket.module.css';
import { deleteDeviceFromBasket } from '../../http/basketAPI';

const BasketItem = ({ device, user, basket }) => {
	const history = useNavigate();
	const [brand, setBrand] = useState('');

	useEffect(() => {
		if (!device) {
			return;
		}
		fetchBrandById(device.brandId).then((data) => setBrand(data.name));
	}, []);

	const deleteFromBasket = () => {
		basket.deleteDevice(device);
		basket.deleteFromBasket(device.id);
		basket.setPrice(basket.price - device.price);
		try {
			deleteDeviceFromBasket(device.id, user.user.id).then();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className={classes.basketItem}>
			<Col
				md={3}
				className='mt-3'
				onClick={() => history(DEVICE_ROUTE + '/' + device.id)}
			>
				<Card
					className='p-3'
					style={{ cursor: 'pointer', width: '200px' }}
					border={'secondary'}
				>
					<Image
						width={150}
						height={150}
						src={process.env.REACT_APP_API_URL + device.img}
					/>
					<div className='d-flex justify-content-between align-items-center'>
						<div className='text-black-50'>{brand}</div>
						<div className='d-flex align-items-center mt-1'>
							<div>{device.rating}</div>
							<Image width={20} height={20} src={star} />
						</div>
					</div>
					<div>{device.name}</div>
				</Card>
			</Col>
			<div className={classes.buttons}>
				<Button onClick={deleteFromBasket} variant='danger'>
					Удалить
				</Button>
			</div>
		</div>
	);
};

export default BasketItem;
