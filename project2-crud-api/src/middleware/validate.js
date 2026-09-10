const { body, param, validationResult } = require('express-validator');
const { isValidObjectId } = require('../utils/objectId');

const idRule = [
  param('id').custom((id) => {
    if (!isValidObjectId(id)) {
      throw new Error('id must be a valid MongoDB ObjectId.');
    }
    return true;
  }),
];

// Books have more than seven fields, which satisfies the Week 03/04 project rule.
const bookRules = [
  body('title').trim().notEmpty().withMessage('title is required.'),
  body('authorName').trim().notEmpty().withMessage('authorName is required.'),
  body('isbn').trim().notEmpty().withMessage('isbn is required.'),
  body('genre').trim().notEmpty().withMessage('genre is required.'),
  body('publishedYear').isInt({ min: 1000, max: 2100 }).withMessage('publishedYear must be a real year.'),
  body('pages').isInt({ min: 1 }).withMessage('pages must be a positive number.'),
  body('language').trim().notEmpty().withMessage('language is required.'),
  body('available').isBoolean().withMessage('available must be true or false.'),
  body('rating').isFloat({ min: 0, max: 5 }).withMessage('rating must be between 0 and 5.'),
];

const authorRules = [
  body('name').trim().notEmpty().withMessage('name is required.'),
  body('country').trim().notEmpty().withMessage('country is required.'),
  body('birthYear').isInt({ min: 1, max: 2100 }).withMessage('birthYear must be a real year.'),
  body('primaryGenre').trim().notEmpty().withMessage('primaryGenre is required.'),
  body('website').optional({ values: 'falsy' }).isURL().withMessage('website must be a valid URL.'),
];

function sendValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    error: 'Validation failed',
    details: errors.array().map((item) => ({
      field: item.path || item.param,
      message: item.msg,
    })),
  });
}

module.exports = {
  authorRules,
  bookRules,
  idRule,
  sendValidationErrors,
};
