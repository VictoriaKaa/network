import React from 'react';
import classes from './Dialogs.module.css'
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import { Field, reduxForm } from 'redux-form';
// для addmessage
import { required, maxLengthCreator } from '../../utils/validator/validators';
import { Textarea } from '../common/FormsControls/FormsControls';



const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogsData.map((el) => (<DialogItem name={el.name} id={el.id} />))
    let messagesElements = props.dialogsPage.messages.map((el) => <Message message={el.message} user={el.user} />)

    let addNewMessage = (values) => {
        props.onAddMessage(values.newMessageBody);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.messages}>
                {messagesElements}
                <div className={classes.formBlock}>
                    <AddMessageFormRedux onSubmit={addNewMessage} />
                </div>
            </div>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
        </div >
    );
}

let maxLength10 = maxLengthCreator(10);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={classes.messageForm}>
            <Field component={Textarea}
                name="newMessageBody" placeholder="Enter your message" className={classes.addField} />
            <div>
                <button className={classes.btn}>Send</button>
            </div>

        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(AddMessageForm);

export default Dialogs;