require('dotenv').config();
const workoutRouts = require('./routes/workouts')
const userRouts = require('./routes/user')
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors")


// express app
const app = express();

// port
const port = process.env.PORT

// middleware
app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path}`)
    next();
})

// Routes
app.use('/api/workout',workoutRouts)
app.use('/api/user',userRouts)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(port,()=>{
        console.log(`App is running on 4000`);
    });
})
.catch((error)=>{
    console.log(error);
})



