import {
    COMMENT_POST, COMMENT_POST_SUCCESS,
    CREATE_POST,
    CREATE_POST_SUCCESS,
    DELETE_POST,
    DELETE_POST_SUCCESS, EDIT_POST, EDIT_POST_SUCCESS,
    FETCH_POSTS,
    FETCH_POSTS_SUCCESS, REACT_POST, REACT_POST_SUCCESS
} from "./actionType";

export const FetchPosts = (setIsLoading) => {
    return {
        type: FETCH_POSTS,
        payload: {setIsLoading}
    }
}

export const FetchPostsSuccess = (posts) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: posts
    }
}

export const CreatePost = (data, setIsLoading, setData, setFileNumbers, formRef) => {
    return {
        type: CREATE_POST,
        payload: {data, setIsLoading, setData, setFileNumbers,formRef}
    }
}

export const CreatePostSuccess = (post) => {
    return {
        type: CREATE_POST_SUCCESS,
        payload: post
    }
}
export const DeletePost = (id, setIsLoading) => {
    return {
        type: DELETE_POST,
        payload: {id, setIsLoading}
    }
}

export const DeletePostSuccess = (id) => {
    return {
        type: DELETE_POST_SUCCESS,
        payload: id
    }
}

export const ReactPost = (id, data) => {
    console.log("SL:DK:LSD")
    return {
        type: REACT_POST,
        payload: {
            id, data
        }
    }
}

export const ReactPostSuccess = (post) => {
    return {
        type: REACT_POST_SUCCESS,
        payload: post
    }
}

export const EditPost = (id, data, setIsLoading, setData, setFileNumbers, formRef, setClosed) => {
    return {
        type: EDIT_POST,
        payload: {
            id, data, setIsLoading, setData, setFileNumbers, formRef, setClosed
        }
    }
}

export const EditPostSuccess = (post) => {
    return {
        type: EDIT_POST_SUCCESS,
        payload: post
    }
}

export const CommentPost = (id, data, setData, formRef) => {
    return {
        type: COMMENT_POST,
        payload: {
            id, data, setData, formRef
        }
    }
}

export const CommentPostSuccess = (post) => {
    return {
        type: COMMENT_POST_SUCCESS,
        payload: post
    }
}