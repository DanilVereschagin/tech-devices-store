const ApiError = require('../error/ApiError');
const { Basket, BasketDevice } = require('../models/models');

class BasketController {
	async check(req, res, next) {
		const { deviceId, userId } = req.query;

		const basket = await Basket.findOne({ where: { userId } });

		const device = await BasketDevice.findOne({
			where: { basketId: basket.id, deviceId },
		});

		if (!device) {
			return res.json(false);
		}
		return res.json(true);
	}

	async getAllByUser(req, res, next) {
		const { deviceId, userId } = req.query;

		const basket = await Basket.findOne({ where: { userId } });

		const devices = await BasketDevice.findAll({
			where: { basketId: basket.id },
		});

		return res.json(devices);
	}

	async add(req, res, next) {
		const { deviceId, userId } = req.body;

		const basket = await Basket.findOne({ where: { userId } });

		await BasketDevice.create({ basketId: basket.id, deviceId });

		return res.json(true);
	}

	async delete(req, res, next) {
		const { deviceId, userId } = req.query;

		const basket = await Basket.findOne({ where: { userId } });

		await BasketDevice.destroy({ where: { basketId: basket.id, deviceId } });

		return res.json(false);
	}
}

module.exports = new BasketController();
