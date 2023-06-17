import { createContext, useReducer } from "react";

export const workoutContext = createContext();

export const workoutsReducer = (state, action)=>{

    switch (action.type) {
        case 'CREATE_WORKOUT':
            return{
                workouts: [action.payload, ...state.workouts]
               
            }
        case 'SET_WORKOUTS':
            return{
                workouts: action.payload
            }
        case 'DELETE_WORKOUT':
            return{
                workouts: state.workouts.filter((work)=> work._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT':
            const newRecords = state.workouts.map((work)=> {
                const match = work._id === action.payload._id  
                if(match) {
                    console.log('matched', action.payload)
                    return action.payload
                } else {
                    return work
                }
            })
            console.log('hit', newRecords)
            return{
                ...state,
                workouts: state.workouts.map((work)=> work._id === action.payload._id ?  action.payload : work)

                
            }
        default:
            return state
    }
    
}

export const WorkoutContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(workoutsReducer,{
        workouts:[]
    })


    return(
        <workoutContext.Provider value={{ ...state, dispatch }}>
            {children}
        </workoutContext.Provider>
    )
}
// todos.map((todo) =>
// todo.id === id ? { ...todo, todo: editedTodo } : todo
// )