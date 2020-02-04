import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

let SET_USER_DATA = 'my-app/auth/SET-USER-DATA';
let GET_CAPTCHA_URL_SUCCESS = 'my-app/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (email, userId, login, isAuth) => ({ type: SET_USER_DATA, payload: { email, userId, login, isAuth } })

export const getCaptchaUrlSuccess = (captchaUrl) =>
    ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })

export const getAuthUserData = () => {
    return async (dispatch) => { // делает асинхронную работу и внутри куча диспатчей        
        let response = await authAPI.me();
        if (response.data.resultCode === 0) {
            let { email, id, login } = response.data.data;
            dispatch(setAuthUserData(email, id, login, true));
        }
    }
}
export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        }
        else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", { _error: message }));
        }
    }
}
export const getCaptchaUrl = () => async (dispatch) => {
    debugger;
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}
export const logout = () => {
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}
//export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching  })

export default authReducer;