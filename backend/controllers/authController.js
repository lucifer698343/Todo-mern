const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {validationResult}=require('express-validator')
const asyncHandler = require('express-async-handler');

//register user
const registerUser=asyncHandler(async(req,res)=>{

    const errors=validationResult(req);
   if(!errors.isEmpty()){

     res.status(400)
    throw new Error(errors.array()[0].msg);
}
    
        const{name, email, password}=req.body;

        const existedUser=await User.findOne({email});
        if(existedUser){
            res.status(400);
            throw new Error("user already exist")

        }

        const passwordHash=await bcrypt.hash(password,10);

        const  newUser=new User({
            name, email, password:passwordHash
        })

        const savedUser=await newUser.save()

        res.status(201).json({
            message:"user saved successfully",
            user:{
                Id:savedUser._id,
                Name:savedUser.name,
                email:savedUser.email
            }
        }
        )
        
    
})

//google register/ Login
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
            role:availableUser.role
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
            Role:user.role,
            Image:user.profileImage
        }
    });
});

//profile image
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


module.exports={
    registerUser,
    googleAuth,
    userLogin,
    Profile,
    uploadProfileImage
}
