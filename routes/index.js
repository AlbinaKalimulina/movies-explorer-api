const router = require('express').Router();
const signUpRouter = require('./signup');
const signInRouter = require('./signin');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');

router.use('/signup', signUpRouter);
router.use('/signin', signInRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

module.exports = router;
