const { Rating } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Sequelize } = require('../db');

class RatingController {
	async create(req, res) {
		const { deviceId, userId, rate } = req.body;

		const ratingByUser = await Rating.findOne({
			where: { userId, deviceId },
		});

		let rating;
		if (!ratingByUser) {
			rating = await Rating.create({ rate, deviceId, userId });
		} else {
			rating = await Rating.update({ rate }, { where: { userId, deviceId } });
		}

		return res.json(rating);
	}

	async getRatingByUserAndDevice(req, res) {
		let { userId, deviceId } = req.query;
		const rating = await Rating.findOne({ where: { userId, deviceId } });
		return res.json(rating);
	}

	async getRatingByDeviceId(deviceId) {
		let rating = await Rating.findAll({
			where: { deviceId },
			attributes: [[Sequelize.fn('AVG', Sequelize.col('rate')), 'rating']],
		});

		return rating[0].dataValues.rating || 0;
	}
}

module.exports = new RatingController();
