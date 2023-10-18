import {
    GET_NOTIFICATIONS, GET_NOTIFICATIONS_SUCCESS,
    LOAD_USER_INFO,
    LOAD_USER_INFO_SUCCESS,
    LOGIN, LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_SUCCESS, PASSWORD_RESET,
    SIGNUP,
    SIGNUP_SUCCESS, UPDATE_NOTIFICATION, UPDATE_NOTIFICATION_SUCCESS
} from "./actionTypes";

export const LoadUserInfo = (data, setIsLoading) => {
    return {type: LOAD_USER_INFO, payload: {data, setIsLoading}}
}

export const LoadingUserInfoSuccess = (user) => {
    return {
        type: LOAD_USER_INFO_SUCCESS, payload: user
    }
}
export const Signup = (data, setIsLoading, navigate) => {
    return {
        type: SIGNUP, payload: { data, setIsLoading, navigate }
    }
}

export const SignupSuccess = (user, token) => {
    return {
        type: SIGNUP_SUCCESS, payload: {user, token}
    }
}

export const Login = (data, setIsLoading, navigate) => {
    return {
        type: LOGIN,
        payload: {
            data, setIsLoading, navigate
        }
    }
}

export const LoginSuccess = (user, token) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user, token
        }
    }
}

export const Logout = (setIsLoading, navigate) => {
    return {
        type: LOGOUT,
        payload: {setIsLoading, navigate}
    }
}
export const LogoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const PasswordReset = (data, setIsLoading, navigate) => {
    return {
        type: PASSWORD_RESET,
        payload: {
            data, setIsLoading, navigate
        }
    }
}

export const GetNotifications = (setIsLoading) => {
    return {
        type: GET_NOTIFICATIONS,
        payload: {setIsLoading}
    }
}

export const GetNotificationsSuccess = (notifications) => {
    return {
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: notifications
    }
}

export const UpdateNotification = (id, data) => {
    return {
        type: UPDATE_NOTIFICATION,
        payload: {id, data}
    }
}

export const UpdateNotificationSuccess = (id, data) => {
    return {
        type: UPDATE_NOTIFICATION_SUCCESS,
        payload: {
            id, data
        }
    }
}