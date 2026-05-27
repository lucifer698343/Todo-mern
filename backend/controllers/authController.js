const User = require('../models/User')
const otpStore = require('../utils/otpStore');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/sendEmail');



// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.status(400);

        throw new Error(errors.array()[0].msg);
    }

    // ONLY EMAIL NOW
    const { email } = req.body;




    // CHECK EXISTING USER
    const existedUser = await User.findOne({ email });

    if (existedUser) {

        res.status(400);

        throw new Error("User already exists");
    }




    // GENERATE OTP
    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString();




    // STORE OTP TEMPORARILY
    otpStore[email] = {

        otp,

        expires: Date.now() + 5 * 60 * 1000 // 5 mins
    };




    // SEND EMAIL
    await sendEmail(email, otp);




    res.status(200).json({

        message: "OTP sent to your email"
    });
});



// GOOGLE REGISTER / LOGIN
const googleAuth = asyncHandler(async (req, res) => {

    const { name, email } = req.body;

    if (!email) {

        res.status(400);

        throw new Error("Email is required");
    }

    // CHECK EXISTING USER
    let user = await User.findOne({ email });




    // CREATE USER IF NOT EXISTS
    if (!user) {

        user = await User.create({

            name,

            email,

            isVerified: true,

            // random password because google login doesn't use password
            password: await bcrypt.hash(
                Math.random().toString(36),
                10
            )
        });
    }






    // CREATE TOKEN
    const token = jwt.sign(

        {
            id: user._id,
            email: user.email,
            role: user.role
        },

        process.env.Secret_key,

        {
            expiresIn: "2h"
        }
    );




    res.status(200).json({

        message: "Google authentication successful",

        token
    });
});




// VERIFY OTP
const verifyOtp = asyncHandler(async (req, res) => {

    const { name, email, password, otp } = req.body;

    const storedOtpData = otpStore[email];

    if (!storedOtpData) {
        res.status(400);
        throw new Error('No OTP request found. Please register again');
    }

    // ✅ FIX: ensure string comparison
    if (String(storedOtpData.otp) !== String(otp)) {
        res.status(400);
        throw new Error('Invalid OTP');
    }

    if (storedOtpData.expires < Date.now()) {
        delete otpStore[email];
        res.status(400);
        throw new Error('OTP expired');
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        delete otpStore[email];
        res.status(400);
        throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: passwordHash,
        isVerified: true
    });

    await newUser.save();

    delete otpStore[email];

    res.status(201).json({
        message: 'Account verified successfully'
    });
});

// LOGIN USER
const userLogin = asyncHandler(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.status(400);

        throw new Error(errors.array()[0].msg);
    }

    const { email, password } = req.body;

    const availableUser = await User.findOne({ email });




    if (!availableUser) {

        res.status(404);

        throw new Error("User not found");
    }




    // CHECK EMAIL VERIFIED
    if (!availableUser.isVerified) {

        res.status(401);

        throw new Error(
            "Please verify your email first"
        );
    }




    const matchPassword = await bcrypt.compare(
        password,
        availableUser.password
    );




    if (!matchPassword) {

        res.status(401);

        throw new Error("Incorrect password");
    }




    const token = jwt.sign(

        {
            id: availableUser._id,
            email: availableUser.email,
            role: availableUser.role
        },

        process.env.Secret_key,

        {
            expiresIn: "2h"
        }
    );




    res.status(200).json({

        message: `Successfully logged in, Welcome ${availableUser.name}`,

        token
    });
});




// PROFILE
const Profile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id);

    if (!user) {

        res.status(404);

        throw new Error("User not found");
    }

    res.status(200).json({

        message: "Welcome to your profile",

        details: {

            Name: user.name,

            Email: user.email,

            Role: user.role,

            Image: user.profileImage
        }
    });
});




// PROFILE IMAGE
const uploadProfileImage = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id);

    if (!user) {

        res.status(404);

        throw new Error('User not found');
    }

    if (!req.file) {

        res.status(400);

        throw new Error('No image uploaded');
    }

    user.profileImage = `/uploads/${req.file.filename}`;

    await user.save();

    res.status(200).json({

        message: 'Profile image uploaded successfully',

        profileImage: user.profileImage
    });
});




module.exports = {

    registerUser,

    googleAuth,

    verifyOtp,

    userLogin,

    Profile,

    uploadProfileImage
}