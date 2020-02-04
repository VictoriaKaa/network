import React from 'react';
import classes from './Users.module.css';
import userPhoto from '../../../src/assets/images/no_avatar.png';
import { NavLink } from "react-router-dom";

let User = ({ user, followingInProgress, follow, unfollow }) => {
    debugger;
    return (
        <div className={classes.user}>
            <div className={classes.top}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={classes.userPhoto} />
                </NavLink>
            </div>
            <div className={classes.bottom}>
                <div className={classes.info}>
                    <div className={classes.name}>{user.name}</div>
                    <div className={classes.status}>{user.status}</div>
                </div>
                <div className={classes.follow}>
                    {user.followed ? <button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => { unfollow(user.id); }} className={classes.btnFollow}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id);}}  className={classes.btnFollow}>Follow</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default User;