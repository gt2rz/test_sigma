const { body } = require('express-validator');
module.exports = [
  body('name').not().isEmpty().isLength({ max: 50 }),
  body('email').not().isEmpty().isEmail().isLength({ max: 30 }),
  body('state').not().isEmpty().isLength({ max: 30 }),
  body('city').not().isEmpty().isLength({ max: 50 }),
]