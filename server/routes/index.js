const Router = require('express');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const ratingRouter = require('./ratingRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/rating', ratingRouter);

module.exports = router;
