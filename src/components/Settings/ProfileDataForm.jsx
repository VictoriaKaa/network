import React from 'react';
import { сreateField, Input, Textarea } from '../common/FormsControls/FormsControls';
import { reduxForm, change } from 'redux-form';
import classes from './Settings.module.css'
import { render } from 'react-dom';

class ProfileDataForm extends React.Component {
    //= ({handleSubmit, profile, error}) => {
    render() {
        return <form onSubmit={this.props.handleSubmit}>
            <div className={classes.info}>
                <div className={classes.infoLine}> <span>Full name: </span>{сreateField("Full Name", "fullName", [], Input)}</div>
                <div className={classes.infoLine}> <span>Looking for a job: </span>{сreateField("", "lookingForAJob", [], Input, { type: "checkbox" })} </div>
                <div className={classes.infoLine}> <span>About me: </span>{сreateField("About me", "aboutMe", [], Textarea)} </div>
                <div className={classes.infoLine}> <span>My professional skills: </span>{сreateField("My professional skills", "lookingForAJobDescription", [], Textarea)} </div>
                <div>
                    Contacts {Object.keys(this.props.profile.contacts).map(key => {
                        return <div className={classes.infoLine} key={key}>
                            <span>{key}: </span>{сreateField(key, "contacts." + key, [], Input)}
                        </div>
                    })}
                </div>
                {this.props.error && <div className={classes.error}>
                    {this.props.error}
                </div>
                }
                <div>
                    <button className={classes.saveBtn}>save</button>
                </div>
            </div>

        </form>
    }

}
// }

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile',
enableReinitialize : true })(ProfileDataForm);

export default ProfileDataFormReduxForm;