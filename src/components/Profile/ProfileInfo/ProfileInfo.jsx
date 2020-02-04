import React, { useState } from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/no_avatar.png';
import ProfileDataForm from '../../Settings/ProfileDataForm';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    if (!profile) {
        return <Preloader />
    }
    return (
        <div className={classes.profileBLock}>
            <div className={classes.profileInner}>
                <img src={profile.photos.large || userPhoto} />
                <div className={classes.statusDescription}>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                </div>
            </div>
            <ProfileData profile={profile} isOwner={isOwner} />
        </div>
    );
}

const ProfileData = ({ profile, isOwner }) => {
    return <div className={classes.info}>
        <div><span>Full name: </span> {profile.fullName} </div>
        <div><span>Looking for a job: </span> {profile.lookingForAJob ? "yes" : "no"}</div>
        <div><span>About me: </span> {profile.aboutMe}</div>
        {profile.lookingForAJob &&
            <div><span>My professional skills: </span> {profile.lookingForAJobDescription}</div>
        }
        <div className={classes.contacts}>Contacts</div> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
        })}
    </div>
}

const Contact = ({ contactTitle, contactValue }) => {
    return <div> <span>{contactTitle}:</span> {contactValue}</div>
}

export default ProfileInfo;