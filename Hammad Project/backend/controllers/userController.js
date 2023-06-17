require('dotenv').config();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// token genretor function
const createToken = (_id) =>{
   return jwt.sign({_id},process.env.SECRET,{expiresIn: '1d'})
}

// login a user
const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await User.login(email,password);

        // create token
        const token = createToken(user._id);

        // firstName from user
        const firstName = user.firstName;
        // console.log(user);

        res.status(200).json({firstName,email,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// signup user
const signupUser = async (req,res) =>{
    const {email,password,firstName,lastName,phone} = req.body;

    try {
        const user = await User.signup(email,password,firstName,lastName,phone);

        // create token
        const token = createToken(user._id);

        res.status(200).json({firstName,email,token})
    } catch (error) {
        console.log('catch');
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}