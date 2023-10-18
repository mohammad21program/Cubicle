import {
    GET_NOTIFICATIONS_SUCCESS,
    LOAD_USER_INFO_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SIGNUP_SUCCESS, UPDATE_NOTIFICATION_SUCCESS
} from "./actionTypes";

const Auth = (state = {currentUser: {}, token: null, notifications: []}, action) => {
    switch (action.type) {
        case LOAD_USER_INFO_SUCCESS:
            return {
                ...state, currentUser: action.payload
            }
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state, currentUser: action.payload.user, token: action.payload.token
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token")
            return {
                ...state, currentUser: {}, token: null
            }
        case GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: action.payload
            }
        case UPDATE_NOTIFICATION_SUCCESS:
            if (action.payload.data?.["ShowAll"]) {
                return {
                    ...state, notifications: state.notifications.map(notification => {
                        notification.isShow = true;
                        return notification;
                    })
                }
            } else if (action.payload.data?.["Read"]) {
                return {
                    ...state, notifications: state.notifications.map(notification => {
                        if (action.payload.id === notification._id) {
                            notification.isRead = true;
                        }
                        return notification;
                    })
                }
            } else if (action.payload.data?.["UnRead"]) {
                return {
                    ...state, notifications: state.notifications.map(notification => {
                        if (action.payload.id === notification._id) {
                            notification.isRead = false;
                        }
                        return notification;
                    })
                }
            } else {
                return state
            }
        default:
            return state
    }
}

export default Auth