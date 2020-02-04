import { getAuthUserData } from "./auth-reducer";

let SET_INITIALIZED_SUCCESS = 'SET-INITIALIZED-SUCCESS';


let initialState = {
    initialized: false,
    globalError: "" // диспатчить в стор и потом выводить, урок 99
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({ type: SET_INITIALIZED_SUCCESS })

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(initializedSuccess());
    });
    // Promise.all([promise]).then(...)
}
//export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching  })

export default appReducer;