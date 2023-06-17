import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    title: {
        type:String,
        required: [true, 'Workout Title Missing!']
    },
    description: {
        type: String,
        required: [true, 'Workout Description Missing!'],
    },
    type: {
        type: String,
        required: [true, 'Workout Type Missing!']
    },
    duration: {
        type: String,
        required: [true, 'Workout Duration Missing!']
    },
    date: {
        type: String,
        required: [true, 'Workout Date Missing!']
    }
},
{
    timestamps: true
}
)


export const WorkOut = mongoose.model('WorkOuts', workoutSchema)