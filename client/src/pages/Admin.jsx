import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';

const Admin = () => {
	const [brandVisible, setBrandVisible] = useState(false);
	const [typeVisible, setTypeVisible] = useState(false);
	const [deviceVisible, setDeviceVisible] = useState(false);

	return (
		<Container className='d-flex flex-column mt-5'>
			<Button
				className='mt-2 w-25'
				variant='dark'
				onClick={() => setTypeVisible(true)}
			>
				Добавить тип
			</Button>
			<Button
				className='mt-2 w-25'
				variant='dark'
				onClick={() => setBrandVisible(true)}
			>
				Добавить бренд
			</Button>
			<Button
				className='mt-2 w-25'
				variant='dark'
				onClick={() => setDeviceVisible(true)}
			>
				Добавить устройство
			</Button>
			<CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
			<CreateDevice
				show={deviceVisible}
				onHide={() => setDeviceVisible(false)}
			/>
		</Container>
	);
};

export default Admin;
