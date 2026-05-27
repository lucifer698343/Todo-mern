const express=require('express');
const router=express.Router();
const middleware=require('../middleware/authmiddleware')
const upload = require('../middleware/uploadMiddleware');
const{
    registerValidation,
    loginValidation
}=require('../validators/authValidator')




const{
    registerUser,
    googleAuth,
    verifyOtp,
    userLogin,
    Profile,
    uploadProfileImage
}=require('../controllers/authController')


//register a new user account
router.post('/Registration',registerValidation,registerUser

)
//login with google
router.post(
    '/google-auth',
    googleAuth
);
//verify otp
router.post(
    '/verify-otp',
    verifyOtp
);
//login to user acccount
router.post('/login',loginValidation,userLogin)

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