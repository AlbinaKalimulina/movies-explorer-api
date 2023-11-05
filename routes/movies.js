const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

//  создаёт фильм с переданными в теле country, director, duration,
// year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    year: Joi.string().required(),
    image: Joi.string()
      .required()
      .pattern(urlRegex),
    trailerLink: Joi.string()
      .required()
      .pattern(urlRegex),
    thumbnail: Joi.string()
      .required()
      .pattern(urlRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

//  удаляет сохранённый фильм по id
router.delete('/:MovieId', celebrate({
  params: Joi.object().keys({
    MovieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);

module.exports = router;
