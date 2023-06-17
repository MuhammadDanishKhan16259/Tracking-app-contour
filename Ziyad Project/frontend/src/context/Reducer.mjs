export const GlobalData = {
  authUser: {},
  userWorkOuts: [],
  Token: "",
  RefreshToken: "",
};


export function Reducer(state, action) {
    switch(action.type){
        case "AUTHORIZED_USER": {
            return{
                ...state, 
                authUser : action.payload
            }
        }
        case "ALL_WORKOUTS":{
            const userWorkOutsClone = state.userWorkOuts.slice(0)
            userWorkOutsClone.push(action.payload)
            return{
                ...state,
                userWorkOuts: userWorkOutsClone
            }
        }
        case "TOKEN_GETTING": {
            return{
                ...state,
                Token : action.payload
            }
        }
        case "REFRESH_TOKEN_GETTING": {
            return{
                ...state,
                RefreshToken : action.payload
            }
        }
        default:
            return state
    }
}