import React, { useEffect, useState } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../../assets/star.png';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../utils/consts';
import { fetchBrandById } from '../../http/deviceAPI';

const DeviceItem = ({ device }) => {
	const history = useNavigate();
	const [brand, setBrand] = useState('');

	useEffect(() => {
		fetchBrandById(device.brandId).then((data) => setBrand(data.name));
	}, []);

	return (
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
	);
};

export default DeviceItem;
