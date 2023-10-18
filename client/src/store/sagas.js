import {all, fork} from "redux-saga/effects"
import AuthSaga from "./auth/saga";
import PostAuth from "./posts/saga"

export default function* rootSaga() {
    yield all([
        fork(AuthSaga),
        fork(PostAuth)
    ])
}