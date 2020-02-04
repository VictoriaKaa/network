import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import classes from './Users.module.css';

let Users = ({totalItemsCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
debugger;
    return (
        <div>
            <Paginator currentPage={currentPage} totalItemsCount={totalItemsCount}
                pageSize={pageSize} onPageChanged={onPageChanged} />
            <div className={classes.usersPage}>
                {
                    users.map(u => <User user={u} key={u.id}
                        followingInProgress={props.followingInProgress}
                        follow={props.follow} unfollow={props.unfollow} />
                    )
                }
            </div>
        </div>
    )
}

export default Users;