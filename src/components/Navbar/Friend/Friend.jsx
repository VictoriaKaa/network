import React from 'react';
import classes from './Friend.module.css'
import { NavLink } from "react-router-dom";

const Friend = (props) => {
    return (
        <div className={classes.friend}>
            <div className={classes.avatar}></div>
            <div>{props.name}</div>
        </div>

    );
}

export default Friend;