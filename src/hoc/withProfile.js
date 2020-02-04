import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../redux/profile-reducer';
import { withAuthRedirect } from './withAuthRedirect';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom';

export const withProfile = (WrappedComponent, isSetting) => {
  return class extends React.Component {
    refreshProfile() {
      debugger;
      let userId = this.props.match.params.userId;
      if (!userId || isSetting) {
        userId = this.props.authUserId;
        if (!userId) {
          this.props.history.push("/login");
        }
      }
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
    componentDidMount() {
      this.refreshProfile();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
      debugger;
      if (this.props.match.params.userId != prevProps.match.params.userId) {
        this.refreshProfile();
      }
    }

    render() {
      debugger;
      if (!this.props.isAuth) return <Redirect to='/login' />;
      return (
        <div>
          <WrappedComponent {...this.props}
            isOwner={!this.props.match.params.userId}
            profile={this.props.profile} status={this.props.status}
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
            saveProfile={this.props.saveProfile} />
        </div>
      );
    }
  }
}