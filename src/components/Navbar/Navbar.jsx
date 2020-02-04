import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from "react-router-dom";
import Friend from './Friend/Friend';
import StoreContext from '../../store-context';

const Navbar = (props) => {

  return (
      // (store) => {
      //   let state = store.getState().sidebar;
      //   let friendsElements = state.friendsData.map((el) => (<Friend name={el.name} id={el.id} />))

        <nav className={classes.nav}>
          <div className={classes.item}>
            <NavLink to='/profile' activeClassName={classes.active}>Profile</NavLink>
          </div>
          <div className={`${classes.item} ${classes.active}`}>
            <NavLink to='/dialogs' activeClassName={classes.active}>Messages</NavLink>
          </div>
          <div className={classes.item}>
            <NavLink to='/users' activeClassName={classes.active}>Users</NavLink>
          </div>
          <div className={classes.item}>
            <NavLink to='/settings' activeClassName={classes.active}>Settings</NavLink>
          </div>
          {/* <div className={classes.item}>
            <NavLink to='/news' activeClassName={classes.active}>News</NavLink>
          </div>
          <div className={classes.item}>
            <NavLink to='/music' activeClassName={classes.active}>Music</NavLink>
          </div>
          
          <div className={classes.sidebar}>
            <div>Friends</div>
             {friendsElements}
          </div> */}
        </nav>

  );
}

export default Navbar;