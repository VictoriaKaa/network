import React from 'react';
import { withRouter } from 'react-router-dom';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import {Redirect} from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withProfile } from '../../hoc/withProfile';

let mapStatetoProps = (state) => ( {
     profile: state.profilePage.profile,
     status: state.profilePage.status,
     authUserId: state.auth.userId,
     isAuth: state.auth.isAuth
} )

let ProfileContainer = withProfile(Profile, false);

export default compose(connect(mapStatetoProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
         withRouter,
         withAuthRedirect
)(ProfileContainer)

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// 

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStatetoProps, {getUserProfile})(WithUrlDataContainerComponent);