import {call, put, takeEvery} from "redux-saga/effects";
import {getError} from "../errors/actions";
import {COMMENT_POST, CREATE_POST, DELETE_POST, EDIT_POST, FETCH_POSTS, REACT_POST} from "./actionType";
import {commentPost, createPost, deletePost, editPost, fetchPosts, reactPost} from "../../api/posts";
import {
    CommentPostSuccess,
    CreatePostSuccess,
    DeletePostSuccess,
    EditPostSuccess,
    FetchPostsSuccess,
    ReactPostSuccess
} from "./actions";

function* postsFetch(action) {
    action.payload.setIsLoading(true)
    try {
        const {data: {posts}} = yield call(fetchPosts);
        action.payload.setIsLoading(false);
        yield put(FetchPostsSuccess(posts))
    } catch (error) {
        action.payload.setIsLoading(true);
        yield put(getError(error.response.data, `${FETCH_POSTS}_ERROR`))
    }
}

function* createPostSaga (action) {
    action.payload.setIsLoading(true)
    try {
        const {data: {post}} = yield call(createPost, action.payload.data);
        action.payload.setIsLoading(false);
        action.payload.setData({});
        action.payload.setFileNumbers([]);
        action.payload.formRef.reset()
        yield put(CreatePostSuccess(post))
    } catch (error) {
        action.payload.setIsLoading(false);
        yield put(getError(error.response.data, `${CREATE_POST}_ERROR`))
    }
}

function* deletePostSaga (action) {
    action.payload.setIsLoading(true)
    try {
        const {data: {post}} = yield call(deletePost, action.payload.id);
        action.payload.setIsLoading(false);
        yield put(DeletePostSuccess(action.payload.id))
    } catch (error) {
        action.payload.setIsLoading(false);
        yield put(getError(error.response.data, `${DELETE_POST}_ERROR`))
    }
}

function* editPostSaga (action) {
    action.payload.setIsLoading(true)
    try {
        const {data: {post}} = yield call(editPost, action.payload.id, action.payload.data);
        action.payload.setIsLoading(false);
        action.payload.formRef.reset();
        action.payload.setData({});
        action.payload.setFileNumbers([]);
        action.payload.setClosed(false)
        yield put(EditPostSuccess(post))
    } catch (error) {
        action.payload.setIsLoading(false);
        yield put(getError(error.response.data, `${EDIT_POST}_ERROR`))
    }
}

function* reactPostSaga (action) {
    try {
        const {data: {post}} = yield call(reactPost, action.payload.id, action.payload.data);
        yield put(ReactPostSuccess(post))
    } catch (error) {
        yield put(getError(error.response.data, `${DELETE_POST}_ERROR`))
    }
}

function* commentPostSaga (action) {
    try {
        const {data: {post}} = yield call(commentPost, action.payload.id, action.payload.data);
        action.payload.setData({});
        action.payload.formRef.reset()
        yield put(CommentPostSuccess(post))
    } catch (error) {
        yield put(getError(error.response.data, `${COMMENT_POST}_ERROR`))
    }
}

function* postSaga() {
    yield takeEvery(FETCH_POSTS, postsFetch);
    yield takeEvery(CREATE_POST, createPostSaga);
    yield takeEvery(DELETE_POST, deletePostSaga);
    yield takeEvery(REACT_POST, reactPostSaga);
    yield takeEvery(EDIT_POST, editPostSaga);
    yield takeEvery(COMMENT_POST, commentPostSaga)
}

export default postSaga;