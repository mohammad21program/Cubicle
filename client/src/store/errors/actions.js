import {CLEAR_ERROR, GET_ERROR} from "./actionTypes";

const clearError = () => {
    return { type: CLEAR_ERROR }
}

const getError = (message, Type) => {
    return { type: GET_ERROR, payload: { message, Type } }
}

export { clearError, getError }