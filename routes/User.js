const express = require('express');
const router = express.Router();
const { SignUp, SignIn, User, forgotPassword, resetPassword } = require('../controller/user.controller');
const { runValidation, validationSignUp, validationSignIn } = require('../validation/index');
const middleware = require('../middleware/middleware')

router.post('/signup', validationSignUp, runValidation, SignUp);
router.post('/signin', validationSignIn, SignIn);
router.get('/user', middleware, User);
router.put('/forgotpassword', forgotPassword );
router.put('/resetpassword', resetPassword );

module.exports = router