import { combineReducers } from "redux";
import { reducer as userReducer } from "./user";

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
