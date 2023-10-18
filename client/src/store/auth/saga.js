import {call, put, takeEvery} from "redux-saga/effects";
import {getNotification, loadUserInfo, login, passwordReset, signup, updateNotification} from "../../api/auth";
import {
    GetNotificationsSuccess,
    LoadingUserInfoSuccess,
    LoginSuccess,
    LogoutSuccess,
    SignupSuccess,
    UpdateNotificationSuccess
} from "./actions";
import {getError} from "../errors/actions";
import {
    GET_NOTIFICATIONS,
    LOAD_USER_INFO,
    LOGIN,
    LOGOUT,
    PASSWORD_RESET,
    SIGNUP,
    UPDATE_NOTIFICATION
} from "./actionTypes";

function* userInfo(action) {
    action.payload.setIsLoading(true)
    try {
        const {data: {user}} = yield call(loadUserInfo, action.payload.data);
        action.payload.setIsLoading(false);
        yield put(LoadingUserInfoSuccess(user))
    } catch (error) {
        action.payload.setIsLoading(false)
        put(getError(error.response.data, `${LOAD_USER_INFO}_ERROR`))
    }
}

function* signupSaga(action) {
    action.payload.setIsLoading(true)
    try {
        const {data: {user, token}} = yield call(signup, action.payload.data);
        action.payload.setIsLoading(false);
        action.payload.navigate("/")
        yield put(SignupSuccess(user, token))
    } catch (error) {
        action.payload.setIsLoading(false);
        yield put(getError(error.response.data, `${SIGNUP}_ERROR`))
    }
}

function* loginSaga(action) {
    action.payload.setIsLoading(true)
    try {
        const {data: {user, token}} = yield call(login, action.payload.data);
        action.payload.setIsLoading(false);
        action.payload.navigate("/")
        yield put(LoginSuccess(user, token))
    } catch (error) {
        action.payload.setIsLoading(false);
        yield put(getError(error.response.data, `${LOGIN}_ERROR`))
    }
}

function* logoutSaga(action) {
    action.payload.setIsLoading(true)
    try {
        yield put(LogoutSuccess());
        action.payload.setIsLoading(false);
        action.payload.navigate("/")
    } catch (error) {
        action.payload.setIsLoading(false)
        yield put(getError(error.response.data, `${LOGOUT}_ERROR`))
    }
}

function* passwordResetSaga(action) {
    action.payload.setIsLoading(true)
    try {
        yield call(passwordReset, action.payload.data);
        action.payload.setIsLoading(false);
        action.payload.navigate("/")
    } catch (error) {
        action.payload.setIsLoading(false)
        yield put(getError(error.response.data, `${PASSWORD_RESET}_ERROR`))
    }
}

function* getNotificationSaga(action) {
    action.payload.setIsLoading(true)
    try {
        const {data: {notifications}} = yield call(getNotification);
        action.payload.setIsLoading(false);
        yield put(GetNotificationsSuccess(notifications))
    } catch (error) {
        action.payload.setIsLoading(false)
        put(getError(error.response.data, `${GET_NOTIFICATIONS}_ERROR`))
    }
}

function* updateNotificationSaga(action) {
    try {
        yield call(updateNotification, action.payload.id, action.payload.data);
        yield put(UpdateNotificationSuccess(action.payload.id, action.payload.data))
    } catch (error) {
        put(getError(error.response.data, `${UPDATE_NOTIFICATION}_ERROR`))
    }
}

function* authSaga() {
    yield takeEvery(LOAD_USER_INFO, userInfo);
    yield takeEvery(SIGNUP, signupSaga);
    yield takeEvery(LOGOUT, logoutSaga);
    yield takeEvery(LOGIN, loginSaga);
    yield takeEvery(PASSWORD_RESET, passwordResetSaga);
    yield takeEvery(GET_NOTIFICATIONS, getNotificationSaga);
    yield takeEvery(UPDATE_NOTIFICATION, updateNotificationSaga)
}

export default authSaga;