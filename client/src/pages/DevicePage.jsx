import React, { useEffect, useState, useContext } from 'react';
import {
	Button,
	Card,
	Col,
	Container,
	Image,
	Row,
	Dropdown,
} from 'react-bootstrap';
import star from '../assets/BigStar.png';
import smallStar from '../assets/star.png';
import {
	createRating,
	fetchDeviceById,
	fetchRatingByUserAndDevice,
} from '../http/deviceAPI';
import {
	addDeviceToBasket,
	deleteDeviceFromBasket,
	checkDeviceInBasket,
} from '../http/basketAPI';
import { useParams } from 'react-router-dom';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const DevicePage = observer(() => {
	const { user } = useContext(Context);
	const { basket } = useContext(Context);
	const [device, setDevice] = useState({ info: [] });
	const [rating, setRating] = useState(0);
	const [inBasket, setInBasket] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		fetchDeviceById(id).then((data) => setDevice(data));
		if (user.user.id) {
			fetchRatingByUserAndDevice(user.user.id, id).then((data) =>
				setRating(data)
			);

			checkDeviceInBasket(id, user.user.id).then((data) => setInBasket(data));
		}
	}, [rating]);

	const addRating = (star) => {
		if (!user.user.id) {
			return;
		}
		createRating({ rate: star, deviceId: id, userId: user.user.id }).then(
			(data) => setRating(data.rating)
		);
		setRating(star);
	};

	const addInBasket = () => {
		if (!user.user.id) {
			return;
		}
		if (inBasket) {
			deleteDeviceFromBasket(id, user.user.id).then((data) =>
				setInBasket(data)
			);
			basket.deleteDevice(device);
			basket.deleteFromBasket(device.id);
			basket.setPrice(basket.price - device.price);
		} else {
			addDeviceToBasket(id, user.user.id).then((data) => setInBasket(data));
			basket.addDevice(device);
			basket.setPrice(basket.price + device.price);
		}
	};

	return (
		<Container className='mt-3'>
			<Row>
				<Col md={4}>
					<h2>{device.name}</h2>
					<Image
						width={300}
						height={300}
						src={process.env.REACT_APP_API_URL + device.img}
					/>
					<div>
						<Dropdown className='mt-2'>
							<Dropdown.Toggle variant='warning' id='dropdown-basic'>
								{rating ? (
									<div className='d-flex align-items-center mt-1'>
										{rating} <Image width={18} height={18} src={smallStar} />
									</div>
								) : (
									'Оценить'
								)}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{[1, 2, 3, 4, 5].map((star) => (
									<Dropdown.Item key={star} onClick={() => addRating(star)}>
										{star}
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</Col>
				<Col md={4}>
					<Row className='d-flex flex-column'>
						<div
							className='d-flex align-items-center justify-content-center ms-2'
							style={{
								background: `url(${star}) no-repeat center center`,
								width: 300,
								height: 300,
								backgroundSize: 'cover',
								fontSize: 64,
							}}
						>
							{device.rating}
						</div>
					</Row>
				</Col>
				<Col md={4}>
					<Card
						className='d-flex flex-column align-items-center justify-content-around'
						style={{
							width: 300,
							height: 300,
							fontSize: 32,
							border: '5px sold lightgray',
						}}
					>
						<h3>От: {device.price} руб.</h3>
						<Button onClick={() => addInBasket()} variant={'outline-dark'}>
							{inBasket ? 'В корзине' : 'Добавить в корзину'}
						</Button>
					</Card>
				</Col>
			</Row>
			<Row className='d-flex flex-column m-3'>
				<h1>Характеристики:</h1>
				{device.info.map((info, index) => (
					<Row
						key={info.id}
						style={{
							background: index % 2 === 0 ? 'lightgray' : 'transparent',
							padding: 10,
						}}
					>
						{info.title}: {info.description}
					</Row>
				))}
			</Row>
		</Container>
	);
});

export default DevicePage;
