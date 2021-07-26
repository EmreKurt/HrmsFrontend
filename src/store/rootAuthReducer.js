import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";




const rootAuthReducer = combineReducers ({
    auth : authReducer
})


export default rootAuthReducer;