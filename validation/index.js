const { check, validationResult } = require('express-validator');

exports.runValidation = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(404).json({
            status: false,
            message: errors.array()[0].msg
        })
    }
    next()
}

exports.validationSignUp = [
    check('email', 'email cannot be empty').notEmpty().matches(/.+\@.+\..+/).withMessage('email must contains @'),
    check('password', 'password cannot be empty').notEmpty().isLength({ min: 6 }).withMessage('password min 6 characters'),
    check('confpassword', 'password cannot be empty').notEmpty().isLength({ min: 6 }).withMessage('password min 6 characters')
]

exports.validationSignIn = [
    check('email', 'email cannot be empty').notEmpty().matches(/.+\@.+\..+/).withMessage('email must contains @'),
    check('password', 'password cannot be empty').notEmpty(),
]