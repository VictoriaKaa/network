let ADD_MESSAGE = 'ADD-MESSAGE';

let user1 = "data:image/jpeg;base64,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";
let user2 = "data:image/jpeg;base64,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";

let initialState = {
    dialogsData: [
        { id: 1, name: 'Andrey' },
        { id: 2, name: 'Dimas' },
        { id: 3, name: 'Vika' },
        { id: 4, name: 'Petya' },
        { id: 5, name: 'Pavel' },
        { id: 6, name: 'Valera' }
    ],
    messages: [
        { id: 1, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. Lorem ipsum.', user: "user1" },
        { id: 2, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. Lorem ipsum.', user: "user2" },
        { id: 3, message: 'Hi3', user: "user1" },
        { id: 4, message: 'H2i', user: "user1" },
        { id: 5, message: 'Hi', user: "user2" },
        { id: 6, message: 'Hi11', user: "user1" }
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            {
                return {
                    ...state,
                    messages: [...state.messages, {     id: 5,
                        message: action.newMessageBody,
                        user: 1
                    }]
                }
            };
        default:
            return state;
    }
}

export const addMessageActionCreator = (newMessageBody) => {
    return {
        type: ADD_MESSAGE,
        newMessageBody
    }
}


export default dialogsReducer;