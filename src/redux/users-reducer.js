import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers';

let FOLLOW = 'FOLLOW';
let UNFOLLOW = 'UNFOLLOW';
let SET_USERS = 'SET-USERS';
let SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
let SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
let TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
let TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';


let initialState = {
    users: [],
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            {
                console.log("FOLLOW");
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true}),
            //    users: state.users.map(u => {
            //         if (u.id === action.userId) {
            //             return { ...u, followed: true };
            //         }
            //         return u; 
            //     })
            }
        }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalItemsCount: action.totalItemsCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}
export const followSuccess = (userId) => ({ type: FOLLOW, userId }) // action creators

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })

export const setUsers = (users) => ({ type: SET_USERS, users })

export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page })

export const setTotalUsersCount = (totalItemsCount) => ({ type: SET_TOTAL_USERS_COUNT, totalItemsCount })

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })


//thunk creators
export const requestUsers = (page, pageSize) => {
    return async (dispatch) => { // делает асинхронную работу и внутри куча диспатчей  
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
        let response = await apiMethod(userId);
        if (response.data.resultCode == 0) {
            dispatch(actionCreator(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
}



export const follow = (userId) => {
    return async (dispatch) => { // делает асинхронную работу и внутри куча диспатчей  
        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = followSuccess;
        followUnfollowFlow( dispatch, userId, apiMethod, actionCreator); 
        dispatch(toggleFollowingProgress(false, userId));
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => { // делает асинхронную работу и внутри куча диспатчей  
        followUnfollowFlow( dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess); 
        dispatch(toggleFollowingProgress(false, userId));
    }
}

export default usersReducer;