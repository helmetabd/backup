import { combineReducers } from "redux";
import dataProfile from "./dataProfile";
import loginReducer from "./loginReducer";
import profileReducer from "./profileReducer";
import dataConsult from "./dataConsult";
import dataDoctor from "./dataDoctor";
import dataPatient from "./dataPatient";
import dataPrescription from "./dataPrescription"
import dataCart from "./dataCart"
import dataMedic from "./dataMedic";
import dataReferral from "./dataRefer";

const reducers = combineReducers({
    isLogin: loginReducer,
    isProfile: profileReducer,
    dataProfile: dataProfile,
    dataConsult: dataConsult,
    dataDoctor: dataDoctor,
    dataPrescription: dataPrescription,
    dataPatient: dataPatient,
    dataCart: dataCart,
    dataMedic: dataMedic,
    dataRefer: dataReferral
})

export default reducers;