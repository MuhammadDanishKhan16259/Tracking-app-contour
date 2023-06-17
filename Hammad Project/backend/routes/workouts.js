const {
postWorkout,
getAllWorkouts,
getOneWorkout,
deleteWorkout,
updateWorkout
} = require('../controllers/workoutController');

const requireAuth = require('../middleware/requireAuth')
const express = require('express');
const routes = express.Router();

routes.use(requireAuth)

// Get all workout
routes.get('/',getAllWorkouts)

// Get one workout
routes.get('/:id',getOneWorkout)

// post one workout
routes.post('/',postWorkout)

// delete one workout
routes.delete('/:id',deleteWorkout)

// update one worlout
routes.put('/:id',updateWorkout)
module.exports = routes