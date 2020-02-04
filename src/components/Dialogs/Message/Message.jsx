import React from 'react';
import classes from './Message.module.css'
import { NavLink } from "react-router-dom";


const Message = (props) => {
    let message = null;
    if(props.user === "user1"){
        message = (<div className={classes.right}>{props.message}</div>)
    }
    else {
        message = (<div className={classes.left}>{props.message}</div>)
    }
    return (
        <div className={classes.messageItem}>
            {/* <div className={classes.user}>{props.user}</div> */}
            {message}
        </div>
    );
}

export default Message;