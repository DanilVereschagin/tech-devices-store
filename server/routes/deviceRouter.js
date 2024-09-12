const Router = require('express');
const DeviceController = require('../controllers/deviceController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), DeviceController.create);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getById);

module.exports = router;
