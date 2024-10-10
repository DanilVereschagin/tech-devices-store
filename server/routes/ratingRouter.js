const Router = require('express');
const RatingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

console.log(2);

router.get('/', authMiddleware, RatingController.getRatingByUserAndDevice);
router.post('/', authMiddleware, RatingController.create);

module.exports = router;
