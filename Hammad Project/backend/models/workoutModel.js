const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutScheme = new Schema({
   name: {
    type: String,
    required:true
   },
   description:{
    type: String,
    required:true
   },
   type:{
    type:String,
    required:true
   },
   duration:{
    type:String,
    required:true
   },
   date:{
    type:String,
    required:true
   },
   user_id:{
      type:String,
      required: true
   }
},{timestamps:true});

module.exports = mongoose.model('Workout',workoutScheme);