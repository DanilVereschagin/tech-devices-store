import React from 'react';
import { observer } from 'mobx-react-lite';
import BasketItem from './BasketItem';
import classes from './Basket.module.css';

const BasketList = observer(({ devices, user, basket }) => {
	return (
		<>
			<div className={classes.basketList}>
				{devices.map((device) => (
					<BasketItem
						key={device.id}
						device={device}
						user={user}
						basket={basket}
					/>
				))}
			</div>
		</>
	);
});

export default BasketList;
