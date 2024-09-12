import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createBrand } from '../../http/deviceAPI';

const CreateBrand = ({ show, onHide }) => {
	const [value, setValue] = useState('');

	const addBrand = () => {
		createBrand({ name: value }).then((data) => {
			setValue('');
			onHide();
		});
	};

	return (
		<>
			<Modal size='lg' centered show={show} onHide={onHide}>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						Добавить новый бренд
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Control
							className='mt-3'
							placeholder='Введите название бренда'
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='danger' onClick={onHide}>
						Отмена
					</Button>
					<Button variant='success' onClick={addBrand}>
						Добавить
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default CreateBrand;
