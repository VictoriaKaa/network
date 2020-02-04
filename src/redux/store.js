import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


let ADD_POST = 'ADD-POST';
let UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
let ADD_MESSAGE = 'ADD-MESSAGE';
let UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

let store = {
    _state: {
        profilePage: {
            postData: [
                { id: 1, message: 'How are you', likesCount: 12 },
                { id: 2, message: "It's my first post", likesCount: 15 }
            ],
            newPostText: 'Vika'
        },
        dialogsPage: {
            dialogsData: [
                { id: 1, name: 'Andrey' },
                { id: 2, name: 'Dimas' },
                { id: 3, name: 'Vika' },
                { id: 4, name: 'Petya' },
                { id: 5, name: 'Pavel' },
                { id: 6, name: 'Valera' }
            ],
            messages: [
                { id: 1, message: 'Hi', user: user1 },
                { id: 2, message: 'Hi4', user: user2 },
                { id: 3, message: 'Hi3', user: user1 },
                { id: 4, message: 'H2i', user: user1 },
                { id: 5, message: 'Hi', user: user2 },
                { id: 6, message: 'Hi11', user: user1 }
            ],
            newMessageText: ''
        },
        sidebar: {
            friendsData: [
                { id: 1, name: 'Andrey' },
                { id: 2, name: 'Dimas' },
                { id: 3, name: 'Vika' }
            ]
        }
    },

    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('State changed');
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) { // {type:'ADD-POST'}

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);

    }
}



window.store = store;


export default store;