import { SETUSER,GETUSER } from "../actions/types";


const userReducer = (state = {user : {}}, action) => {
  if(action.type === SETUSER){ 
    
    return  {...state ,user: action.payload};
  }
  else{
    return state;
  }
};


export default userReducer;
