import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator} from '../../../utils/validator/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

let maxLength10 = maxLengthCreator(10);

const MyPosts = React.memo((props) => {
    let postsElements = props.profilePage.postData.map(p => <Post key={p.id} message={p.message} date={p.date} />)
    let addPost = (values) => {
        let date = (new Date()).toLocaleDateString('ru-RU');
        debugger;
        props.addPost(values.newPost, date);
    };

    return (
        <div className={classes.postsBlock}>
            <AddPostFormRedux onSubmit={addPost} />
            <div className={classes.posts}>
                {postsElements}
            </div>

        </div>
    );
})

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.profileForm}>
                <div>
                    <Field component={Textarea} name="newPost" placeholder="Enter your post"
                    validate={ [required, maxLength10]} />
                </div>
                <div>
                    <button className={classes.addBtn}>Add post</button>
                </div>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm({form: "profileAddPostForm"})(AddPostForm);

export default MyPosts;