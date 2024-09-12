const Router = require('express');
const BrandController = require('../controllers/brandController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), BrandController.create);
router.get('/', BrandController.getAll);
router.get('/:id', BrandController.getById);

module.exports = router;
