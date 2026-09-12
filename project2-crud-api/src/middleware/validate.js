const { body, param, validationResult } = require('express-validator');
const { isValidObjectId } = require('../utils/objectId');

const idRule = [
  param('id').custom((id) => {
    // Reject invalid MongoDB ids before the request reaches the controller.
    if (!isValidObjectId(id)) {
      throw new Error('id must be a valid MongoDB ObjectId.');
    }
    return true;
  }),
];

// Books have more than seven fields, which satisfies the Week 03/04 project rule.
const bookRules = [
  // These string fields must not be blank.
  body('title').trim().notEmpty().withMessage('title is required.'),
  body('authorName').trim().notEmpty().withMessage('authorName is required.'),
  body('isbn').trim().notEmpty().withMessage('isbn is required.'),
  body('genre').trim().notEmpty().withMessage('genre is required.'),
  // Numeric fields use ranges so impossible values are rejected.
  body('publishedYear').isInt({ min: 1000, max: 2100 }).withMessage('publishedYear must be a real year.'),
  body('pages').isInt({ min: 1 }).withMessage('pages must be a positive number.'),
  body('language').trim().notEmpty().withMessage('language is required.'),
  // available is a true/false value, not text like "yes" or "no".
  body('available').isBoolean().withMessage('available must be true or false.'),
  // Rating is limited to a normal 0 to 5 scale.
  body('rating').isFloat({ min: 0, max: 5 }).withMessage('rating must be between 0 and 5.'),
];

const authorRules = [
  // Authors are a second collection, which satisfies the Project 2 requirement.
  body('name').trim().notEmpty().withMessage('name is required.'),
  body('country').trim().notEmpty().withMessage('country is required.'),
  body('birthYear').isInt({ min: 1, max: 2100 }).withMessage('birthYear must be a real year.'),
  body('primaryGenre').trim().notEmpty().withMessage('primaryGenre is required.'),
  // website is optional, but if it is present it should be a real URL.
  body('website').optional({ values: 'falsy' }).isURL().withMessage('website must be a valid URL.'),
];

// Send a clear 400 response when validation fails.
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
