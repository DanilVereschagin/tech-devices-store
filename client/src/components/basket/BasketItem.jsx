import React, { useEffect, useState } from 'react';
import { fetchDeviceById, fetchBrandById } from '../../http/deviceAPI';
import { DEVICE_ROUTE } from '../../utils/consts';
import star from '../../assets/star.png';
import { useNavigate } from 'react-router-dom';
import { Col, Card, Image, Button } from 'react-bootstrap';
import classes from './Basket.module.css';

const BasketItem = ({ deviceId, calculateTotalPrice }) => {
	const history = useNavigate();
	const [brand, setBrand] = useState('');
	const [device, setDevice] = useState({});

	useEffect(() => {
		fetchDeviceById(deviceId).then((data) => setDevice(data));
	}, []);

	useEffect(() => {
		if (!device) {
			return;
		}
		fetchBrandById(device.brandId).then((data) => setBrand(data.name));
		calculateTotalPrice(device.price);
	}, [device]);

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
				<Button variant='danger'>Удалить</Button>
				<Button className='ms-2'>Купить</Button>
			</div>
		</div>
	);
};

export default BasketItem;
