import { $host, $authHost } from './index';

export const createType = async (type) => {
	const { data } = await $authHost.post('api/type', type);
	return { data };
};

export const fetchTypes = async () => {
	const { data } = await $host.get('api/type');
	return data;
};

export const createBrand = async (brand) => {
	const { data } = await $authHost.post('api/brand', brand);
	return { data };
};

export const fetchBrands = async () => {
	const { data } = await $host.get('api/brand');
	return data;
};

export const fetchBrandById = async (id) => {
	const { data } = await $host.get('api/brand/' + id);
	return data;
};

export const createDevice = async (device) => {
	const { data } = await $authHost.post('api/device', device);
	return { data };
};

export const fetchDevices = async (typeId, brandId, limit = 10, page) => {
	const { data } = await $host.get('api/device', {
		params: {
			brandId,
			typeId,
			limit,
			page,
		},
	});

	return data;
};

export const fetchDeviceById = async (id) => {
	const { data } = await $host.get('api/device/' + id);
	return data;
};

export const createRating = async (rating) => {
	const { data } = await $host.post('api/rating', rating);
	return data;
};

export const fetchRatingByUserAndDevice = async (userId, deviceId) => {
	const { data } = await $host.get('api/rating/', {
		params: {
			userId,
			deviceId,
		},
	});

	return data.rate;
};
