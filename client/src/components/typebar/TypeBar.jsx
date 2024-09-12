import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../index';
import ListGroup from 'react-bootstrap/ListGroup';
import classes from './TypeBar.module.css';

const TypeBar = observer(() => {
	const { device } = useContext(Context);

	const selectType = (type) => {
		if (device.selectedType.id === type.id) {
			device.setSelectedType({});
			return;
		}

		device.setSelectedType({});
		device.setSelectedType(type);
	};

	return (
		<ListGroup>
			{device.types.map((type) => (
				<ListGroup.Item
					className={classes.item}
					active={type.id === device.selectedType.id}
					onClick={() => selectType(type)}
					key={type.id}
				>
					{type.name}
				</ListGroup.Item>
			))}
		</ListGroup>
	);
});

export default TypeBar;
