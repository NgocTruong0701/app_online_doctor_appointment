import { combineReducers } from "redux";
import { reducer as userReducer } from "./user";
import { reducer as appStateReducer } from "./appState";

const rootReducer = combineReducers({
    user: userReducer,
    appState: appStateReducer,
});

export default rootReducer;
