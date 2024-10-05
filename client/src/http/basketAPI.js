import { $authHost, $host } from './index';

export const checkDeviceInBasket = async (deviceId, userId) => {
	const { data } = await $authHost.get('api/basket/check', {
		params: {
			deviceId,
			userId,
		},
	});
	console.log(data);
	return data;
};

export const fetchBasketByUser = async (userId) => {
	const { data } = await $authHost.get('api/basket/fetch', {
		params: {
			userId,
		},
	});

	return data;
};

export const addDeviceToBasket = async (deviceId, userId) => {
	const { data } = await $authHost.post('api/basket/add', { deviceId, userId });
	return data;
};

export const deleteDeviceFromBasket = async (deviceId, userId) => {
	const { data } = await $authHost.delete('api/basket/delete', {
		params: {
			deviceId,
			userId,
		},
	});
	return data;
};
