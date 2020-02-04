import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import SettingsProfile from './Settings';
import ProfileContainer from '../Profile/ProfileContainer';
import {withProfile} from '../../hoc/withProfile';

let mapStatetoProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

let Settings = withProfile(SettingsProfile, true);

export default compose(connect(mapStatetoProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthRedirect
)(Settings)
