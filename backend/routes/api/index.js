const router = require('express').Router();

const sessionRouter = require('./session');
const usersRouter = require('./users');
const eventsRouter = require('./events');
const searchRouter = require('./search');
const convoRouter = require('./convo');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/events', eventsRouter);

router.use('/search', searchRouter);

router.use('/conversations', convoRouter);

module.exports = router;
