const { body } = require('express-validator');

// REGISTER STEP 1 (ONLY EMAIL)
const registerValidation = [
    body('email')
        .notEmpty().withMessage("email cannot be empty")
        .isEmail().withMessage("invalid email format")
];


// LOGIN (UNCHANGED)
const loginValidation = [
    body('email')
        .isEmail().withMessage('Invalid email'),

    body('password')
        .notEmpty().withMessage('Password required')
];

module.exports = {
    registerValidation,
    loginValidation
};