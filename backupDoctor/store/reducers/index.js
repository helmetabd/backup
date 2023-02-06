import { combineReducers } from "redux";
import dataProfile from "./dataProfile";
import loginReducer from "./loginReducer";
import profileReducer from "./profileReducer";
import dataConsult from "./dataConsult";
import dataDiagnose from "./dataDiagnose";
import dataPatient from "./dataPatient";
import dataPrescription from "./dataPrescription"
import dataMedic from "./dataMedic";
import dataHospital from "./dataHosp";

const reducers = combineReducers({
    isLogin: loginReducer,
    isProfile: profileReducer,
    dataProfile: dataProfile,
    dataConsult: dataConsult,
    dataDiagnose: dataDiagnose,
    dataPrescription: dataPrescription,
    dataPatient: dataPatient,
    dataMedic: dataMedic,
    dataHosp: dataHospital
})

export default reducers;