import React from 'react';
import classes from './Post.module.css'

const Post = (props) => {
    return (
        <div className={classes.item}>
            <img src='https://img11.postila.ru/data/93/15/78/2e/9315782e8dd1e893912b554d79d2938783355ac0fa91f67db331452b95fd1196.jpg' />
            <div className={classes.itemInner}>
                <div className={classes.message}> {props.message}</div>
                <div className={classes.date}>{props.date}</div>
            </div>
        </div>
    );
}

export default Post;