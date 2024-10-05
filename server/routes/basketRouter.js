const Router = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const BasketController = require('../controllers/basketController');

const router = new Router();

router.get('/check', authMiddleware, BasketController.check);
router.get('/fetch', authMiddleware, BasketController.getAllByUser);
router.post('/add', authMiddleware, BasketController.add);
router.delete('/delete', authMiddleware, BasketController.delete);

module.exports = router;
