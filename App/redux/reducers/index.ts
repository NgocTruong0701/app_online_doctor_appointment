import { combineReducers } from "redux";
import { reducer as userReducer } from "./user";
import { reducer as appStateReducer } from "./appState";
import { reducer as doctorSelectedReducer } from "./doctorSelected";
import {reducer as appointmentDetailsReducer } from "./appointmentDetails";

const rootReducer = combineReducers({
    user: userReducer,
    appState: appStateReducer,
    doctorSelected: doctorSelectedReducer,
    appointmentDetails: appointmentDetailsReducer,
});

export default rootReducer;
