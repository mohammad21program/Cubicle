import {combineReducers} from "redux";

import Auth from "./auth/reducer";
import Post from "./posts/reducer";
import Error from "./errors/reducer";
import customization from "./layout/customizationReducer"

const rootReducer = combineReducers({
    Auth,
    Post,
    Error,
    customization
})

export default rootReducer;