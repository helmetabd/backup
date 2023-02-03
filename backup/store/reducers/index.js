import { combineReducers } from "redux";
import dataProfile from "./dataProfile";
import loginReducer from "./loginReducer";
import profileReducer from "./profileReducer";
import dataConsult from "./dataConsult";
import dataDoctor from "./dataDoctor";

const reducers = combineReducers({
    isLogin: loginReducer,
    isProfile: profileReducer,
    dataProfile: dataProfile,
    dataConsult: dataConsult,
    dataDoctor: dataDoctor
})

export default reducers;