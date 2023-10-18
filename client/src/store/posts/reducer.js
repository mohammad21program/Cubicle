import {
    COMMENT_POST_SUCCESS,
    CREATE_POST_SUCCESS,
    DELETE_POST_SUCCESS,
    EDIT_POST_SUCCESS,
    FETCH_POSTS_SUCCESS,
    REACT_POST_SUCCESS
} from "./actionType";

const Post = (state = {Posts: []}, action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state, Posts: action.payload
            }
        case CREATE_POST_SUCCESS:
            return {
                ...state, Posts: [action.payload, ...state.Posts]
            }
        case DELETE_POST_SUCCESS:
            return {
                ...state, Posts: [...state.Posts.filter(post => post._id !== action.payload)]
            }
        case REACT_POST_SUCCESS:
        case EDIT_POST_SUCCESS:
        case COMMENT_POST_SUCCESS:
            return {
                ...state, Posts: [...state.Posts.map(post => {
                    if (post._id === action.payload._id) {
                        return action.payload
                    } else {
                        return post;
                    }
                })]
            }
        default:
            return state
    }
}

export default Post