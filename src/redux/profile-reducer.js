import { usersAPI } from "../api/api";
import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";


let ADD_POST = 'ADD-POST';
let SET_USER_PROFILE = 'SET-USER-PROFILE';
let SET_STATUS = 'SET-STATUS';
let DELETE_POST = 'DELETE-POST';
let SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    postData: [
        { id: 1, message: "It's my first post", date: "30.10.2019" },
        { id: 2, message: "How are you", date: "10.11.2019" }
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPost,
                date: action.date
            };
            let stateCopy = { ...state };
            stateCopy.postData = [...state.postData];
            stateCopy.postData.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }
        case SET_STATUS: {
            return { ...state, status: action.status };
        }
        case DELETE_POST: {
            return { ...state, postData: state.postData.filter(p => p.id != action.postId) };
        }
        case SAVE_PHOTO_SUCCESS: {
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        }
        default:
            return state;
    }
}
export const addPostActionCreator = (newPost, date) => ({ type: ADD_POST, newPost, date })

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export const setStatus = (status) => ({ type: SET_STATUS, status })

export const deletePost = (postId) => ({ type: DELETE_POST, postId })

export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })


export const getUserProfile = (userId) => {
    debugger;
    return async (dispatch) => {
        let response = await usersAPI.getProfile(userId);
        dispatch(setUserProfile(response.data));
    }
}

export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status);
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        }
        catch(error) {
            //
        }
    }
}

export const savePhoto = (photo) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(photo);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }
}
export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let response = await profileAPI.saveProfile(profile);
        debugger;
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId));
        }
        else {
            dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
            // return Promise.reject(response.data.messages[0]);
        }
    }
}
export default profileReducer;