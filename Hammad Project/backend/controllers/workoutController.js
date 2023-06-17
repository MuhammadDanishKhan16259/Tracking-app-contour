const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
const requireAuth = require('./middleware/requireAuth');



// Get all workout
const getAllWorkouts = async(req,res)=>{
    try {
        const user_id = req.user._id;
        const workouts = await Workout.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(workouts)
    } catch (error) {
        console.log(error.meassage);
    }
    
}

// Get one workout
const getOneWorkout = async(req,res)=>{
    const {id} =  req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No such workout!'})
        }
        const workout = await Workout.findById(id);
        if(!workout){
            return res.status(404).json({error:'No such workout!'})
        }
        res.status(200).json(workout);
    } catch (error) {
        console.log(error.message);
    }
   
}

// post one workout
const postWorkout = async (req,res)=>{
    const {name,description,type,duration,date} = req.body;
    let emptyFields = [];

    if(!name){
        emptyFields.push('name')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!type){
        emptyFields.push('type')
    }
    if(!duration){
        emptyFields.push('duration')
    }
    if(!date){
        emptyFields.push('date')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please filled all fields!',emptyFields})
    }

    try {
        const user_id = req.user._id;
        const workout = await Workout.create({
            name,description,type,duration,date,user_id
        })
        res.status(200).json(workout)
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
    

}


// delete one workout
const deleteWorkout = async(req,res) =>{
    const {id} =  req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No such workout!'})
        }
        const workout = await Workout.findByIdAndDelete({_id:id})
        if(!workout){
            return res.status(400).json({error:'No such workout!'})
        }
        res.status(200).json(workout);
    } catch (error) {
        console.log(error.message);
    }
}

// update one worlout
const updateWorkout = async (req,res) => {
    const {id} =  req.params;
    try {
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No such workout!'})
        }
        
        const workout = await Workout.findOneAndUpdate({ _id:id }, {
            ...req.body
        }, {new: true})

        console.log(workout)

        if(!workout){
            return res.status(400).json({error:'No such workout!'})
        }
        
        res.status(201).json(workout);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    postWorkout,
    getAllWorkouts,
    getOneWorkout,
    deleteWorkout,
    updateWorkout
}