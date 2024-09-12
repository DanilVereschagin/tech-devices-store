const Router = require('express');
const RatingController = require('../controllers/ratingController');

const router = new Router();

router.get('/', RatingController.getRatingByUserAndDevice);
router.post('/', RatingController.create);

module.exports = router;
