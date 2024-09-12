import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { Col, Container, Row } from 'react-bootstrap';
import TypeBar from '../components/typebar/TypeBar';
import BrandBar from '../components/brandbar/BrandBar';
import DeviceList from '../components/device/DeviceList';
import { observer } from 'mobx-react-lite';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import Pages from '../components/pagination/Pages';

const Shop = observer(() => {
	const { device } = useContext(Context);

	useEffect(() => {
		fetchTypes().then((data) => device.setTypes(data));
		fetchBrands().then((data) => device.setBrands(data));
		fetchDevices(null, null, device.limit, 1).then((data) => {
			device.setDevices(data.rows);
			device.setTotalCount(data.count);
		});
	}, []);

	useEffect(() => {
		fetchDevices(
			device.selectedType.id,
			device.selectedBrand.id,
			device.limit,
			device.page
		).then((data) => {
			device.setDevices(data.rows);
			device.setTotalCount(data.count);
		});
	}, [device.page, device.selectedBrand.id, device.selectedType.id]);

	return (
		<div>
			<Container>
				<Row className='mt-2'>
					<Col md={3}>
						<TypeBar />
					</Col>
					<Col md={9}>
						<BrandBar />
						<DeviceList />
						<Pages />
					</Col>
				</Row>
			</Container>
		</div>
	);
});

export default Shop;
