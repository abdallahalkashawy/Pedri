import { SETUSER,GETUSER } from "../actions/types";


const userReducer = (state = {user : {}}, action) => {
  if(action.type === SETUSER){ 
    // console.log(action.payload);
    return  {...state ,user: action.payload};
  }
  else{
    return state;
  }
};


export default userReducer;
