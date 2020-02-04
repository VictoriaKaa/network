import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './Header.module.css';

const Header = (props) => {
    return (
        <header className={classes.header}>
          <div className={classes.loginBlock}>
            { props.isAuth
            ? <div className={classes.name}> {props.login}  
            <button onClick={props.logout} className={classes.loginBtn}> Log out</button>
            </div> 
              : <NavLink to={'/login'}  className={classes.loginBtn}>Login</NavLink> }
          </div>
        </header>
    );
}

export default Header;