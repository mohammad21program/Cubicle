import {GET_ERROR, CLEAR_ERROR} from "./actionTypes";
const Error = (state = { message: null, field:null, Type: null, StateName: "NotAuthorized" }, action) => {
    switch (action.type) {
        case GET_ERROR:
            return {
                ...state,
                message: action.payload.message.message,
                field: action.payload.message.field,
                Type: action.payload.Type
            }
        case CLEAR_ERROR:
            return { ...state, message: null, Type: null }
        default:
            return state
    }
}

export default Error