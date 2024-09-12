import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';

const CreateDevice = ({ show, onHide }) => {
	const { device } = useContext(Context);
	const [info, setInfo] = useState([]);
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [file, setFile] = useState(null);
	const [brand, setBrand] = useState({});
	const [type, setType] = useState({});

	useEffect(() => {
		fetchBrands().then((data) => device.setBrands(data));
		fetchTypes().then((data) => device.setTypes(data));
	}, []);

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }]);
	};

	const removeInfo = (number) => {
		setInfo(info.filter((i) => i.number !== number));
	};

	const changeInfo = (key, value, number) => {
		setInfo(
			info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
		);
	};

	const selectFile = (e) => {
		setFile(e.target.files[0]);
	};

	const addDevice = () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('price', `${price}`);
		formData.append('img', file);
		formData.append('brandId', brand.id);
		formData.append('typeId', type.id);
		formData.append('info', JSON.stringify(info));
		createDevice(formData).then((data) => close());
	};

	const close = () => {
		setName('');
		setPrice(0);
		setInfo([]);
		setFile(null);
		setBrand({});
		setType({});
		onHide();
	};

	return (
		<>
			<Modal size='lg' centered show={show} onHide={close}>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						Добавить новый девайс
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Dropdown className='mt-2 mb-2'>
							<Dropdown.Toggle variant='secondary' id='dropdown-basic'>
								{type.name || 'Выберите тип'}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{device.types.map((type) => (
									<Dropdown.Item onClick={() => setType(type)} key={type.id}>
										{type.name}
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown className='mt-2 mb-2'>
							<Dropdown.Toggle variant='secondary' id='dropdown-basic'>
								{brand.name || 'Выберите бренд'}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{device.brands.map((brand) => (
									<Dropdown.Item onClick={() => setBrand(brand)} key={brand.id}>
										{brand.name}
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>
						<Form.Control
							className='mt-3'
							placeholder='Введите название устройства'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Form.Control
							className='mt-3'
							placeholder='Введите стоимость устройства'
							type='number'
							value={price}
							onChange={(e) => setPrice(Number(e.target.value))}
						/>
						<Form.Control className='mt-3' type='file' onChange={selectFile} />
						<hr />
						<Button variant='dark' onClick={addInfo}>
							Добавить новое свойство
						</Button>
						{info.map((i) => (
							<Row className='mt-4' key={i.number}>
								<Col md={4}>
									<Form.Control
										placeholder='Введите название свойства'
										value={i.title}
										onChange={(e) =>
											changeInfo('title', e.target.value, i.number)
										}
									/>
								</Col>
								<Col md={4}>
									<Form.Control
										placeholder='Введите описание свойства'
										value={i.description}
										onChange={(e) =>
											changeInfo('description', e.target.value, i.number)
										}
									/>
								</Col>
								<Col md={4}>
									<Button variant='danger' onClick={() => removeInfo(i.number)}>
										Удалить
									</Button>
								</Col>
							</Row>
						))}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='danger' onClick={close}>
						Отмена
					</Button>
					<Button variant='success' onClick={addDevice}>
						Добавить
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default CreateDevice;
