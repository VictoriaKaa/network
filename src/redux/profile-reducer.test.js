
import profileReducer, { addPostActionCreator, deletePost } from './profile-reducer';

it('length of posts should be incremented', () => {
    // 1. text data
    let action = addPostActionCreator("hiiiii");
    let state =  {
        postData: [
            { id: 1, message: 'How are you', likesCount: 12 },
            { id: 2, message: "It's my first post", likesCount: 15 }
        ],
        profile: null,
        status: ''
    }
    // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.postData.length).toBe(3);
});

it('message of new post should be correct', () => {
    // 1. text data
    let action = addPostActionCreator("hiiiii");
    let state =  {
        postData: [
            { id: 1, message: 'How are you', likesCount: 12 },
            { id: 2, message: "It's my first post", likesCount: 15 }
        ],
        profile: null,
        status: ''
    }
    // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.postData[2].message).toBe("hiiiii");
});
it('after deleting length of messages should be decrement', () => {
    // 1. text data
    let action = deletePost(1);
    let state =  {
        postData: [
            { id: 1, message: 'How are you', likesCount: 12 },
            { id: 2, message: "It's my first post", likesCount: 15 }
        ],
        profile: null,
        status: ''
    }
    // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.postData.length).toBe(1);
});
