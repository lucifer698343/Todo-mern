const express=require('express');
const router=express.Router();
const middleware=require('../middleware/authmiddleware')
const upload = require('../middleware/uploadMiddleware');
const {body}=require('express-validator')


const{
    registerUser,
    userLogin,
    Profile,
    uploadProfileImage
}=require('../controllers/authController')


//register a new user account
router.post('/Registration',
    [
        body('name')
        .notEmpty().withMessage("your name cannot be empty"),

        body('email')
        .notEmpty().withMessage("email cannot be empty")
        .isEmail().withMessage("invalid email format"),

        body('password')
        .notEmpty().withMessage("password cannot be empty")
        .isLength({min:6, max:12})

    ],
    registerUser

)

//login to user acccount
router.post('/login',
    [
         body('email')
        .isEmail().withMessage('Invalid email'),

        body('password')
        .notEmpty().withMessage('Password required')
    ],
    userLogin)

//middleware for protected routes
router.use(middleware);

//to fetch user profile
router.get('/Myprofile',Profile)

//upload profile image
router.put(
    '/upload-profile',

    middleware,

    upload.single('profileImage'),

    uploadProfileImage
);




module.exports=router;