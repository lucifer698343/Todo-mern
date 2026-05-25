const {body}=require('express-validator')

const registerValidation=[
    body('name')
        .notEmpty().withMessage("your name cannot be empty"),

        body('email')
        .notEmpty().withMessage("email cannot be empty")
        .isEmail().withMessage("invalid email format"),

        body('password')
        .notEmpty().withMessage("password cannot be empty")
        .isLength({min:6, max:12})
]

const loginValidation=[
    body('email')
        .isEmail().withMessage('Invalid email'),

        body('password')
        .notEmpty().withMessage('Password required')
]


module.exports={
    registerValidation,
    loginValidation
}