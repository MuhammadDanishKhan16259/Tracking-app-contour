const mongoose = require('mongoose');
const bycrpt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        // required:true   
    },
    lastName:{
        type:String,
        // required:true
    },
    phone:{
        type:String,
        // required:true
    }
})

// static signup Method

userSchema.statics.signup =async function(email,password,firstName,lastName,phone){

    // Validations
    if(!email || !password || !firstName || !lastName || !phone){
        throw Error('All fields must be required!')
    }

    if(!validator.isEmail(email)){
        throw Error('Please enter valid email')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('please enter a strong password')
    }
    const exist = await this.findOne({ email })
    if(exist){
        throw Error('Email is already exist')
    }

    const salt = await bycrpt.genSalt(10)
    const hash = await bycrpt.hash(password,salt)

    const user = await this.create({email,password:hash,firstName,lastName,phone})

    return user
}

// login user static method

userSchema.statics.login = async function(email,password){
    // Validations
    if(!email || !password){
        throw Error('All fields must be required!')
    }
    const user = await this.findOne({ email })
    if(!user){
        throw Error('Incoorect email')
    }

    const match = await bycrpt.compare(password,user.password);
    console.log(user);
    if(!match){
        throw Error('Incoorect Password')
    }

    return user
}

module.exports = mongoose.model('user',userSchema);