import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Context } from '../../index';

const BrandBar = observer(() => {
	const { device } = useContext(Context);

	const selectBrand = (brand) => {
		if (device.selectedBrand.id === brand.id) {
			device.setSelectedBrand({});
			return;
		}

		device.setSelectedBrand({});
		device.setSelectedBrand(brand);
	};

	return (
		<Row className='d-flex' xs='auto'>
			{device.brands.map((brand) => (
				<Card
					border={
						brand.id === device.selectedBrand.id ? 'primary' : 'secondary'
					}
					className='p-3'
					style={{ cursor: 'pointer', marginRight: '5px', marginTop: '5px' }}
					key={brand.id}
					onClick={() => selectBrand(brand)}
				>
					{brand.name}
				</Card>
			))}
		</Row>
	);
});

export default BrandBar;
