const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const { Device, DeviceInfo, Rating } = require('../models/models');
const RatingController = require('../controllers/ratingController');

class DeviceController {
	async create(req, res, next) {
		try {
			let { name, price, brandId, typeId, info } = req.body;
			const { img } = req.files;
			let fileName = uuid.v4() + '.jpg';
			img.mv(path.resolve(__dirname, '..', 'static', fileName));

			const device = await Device.create({
				name,
				price,
				brandId,
				typeId,
				img: fileName,
			});

			if (info) {
				info = JSON.parse(info);
				info.forEach((i) =>
					DeviceInfo.create({
						title: i.title,
						description: i.description,
						deviceId: device.id,
					})
				);
			}

			return res.json(device);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req, res) {
		let { brandId, typeId, limit, page } = req.query;
		page = page || 1;
		limit = limit || 10;
		let offset = page * limit - limit;
		let devices;
		if (!brandId && !typeId) {
			devices = await Device.findAndCountAll({ limit, offset });
		}
		if (brandId && !typeId) {
			devices = await Device.findAndCountAll({
				where: { brandId },
				limit,
				offset,
			});
		}
		if (!brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { typeId },
				limit,
				offset,
			});
		}
		if (brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { brandId, typeId },
				limit,
				offset,
			});
		}

		for (let i = 0; i < devices.rows.length; i++) {
			devices.rows[i].dataValues.rating =
				await RatingController.getRatingByDeviceId(devices.rows[i].id);
		}

		return res.json(devices);
	}

	async getById(req, res) {
		const { id } = req.params;
		const device = await Device.findOne(
			{
				where: { id },
				include: [{ model: DeviceInfo, as: 'info' }],
			},
			{ raw: true }
		);

		device.rating = await RatingController.getRatingByDeviceId(device.id);
		return res.json(device);
	}
}

module.exports = new DeviceController();
