const {body} = require('express-validator')

exports.registerValidadtion = [
  body('firstName').trim().notEmpty().withMessage('First name require')
      .matches(/^[a-zA-z ]*$/).withMessage('Only Characters with white space are allowed'),

  body('lastName').trim().notEmpty().withMessage('Last name require')
      .matches(/^[a-zA-z ]*$/).withMessage('Only Characters with white space are allowed'),

  body('email').notEmpty().withMessage('Email address required')
      .normalizeEmail().isEmail().withMessage('Must be a valid email'),

  body('phone').trim().notEmpty().withMessage('Phone number required')
      .isNumeric().withMessage('Phone number must be numeric')
      .isLength({max: 15, min: 8}).withMessage('Invalid phone number'),

  body('password').trim().notEmpty().withMessage('Password required')
      .not().matches(/^$|\s+/).withMessage('White space not allowed'),

  body('confirmPassword').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Password Confirmation does not match password')
    }
    return true
  })
]
