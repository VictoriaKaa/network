import React, { useState } from 'react';
import classes from './Settings.module.css'
import Preloader from '../common/Preloader/Preloader';
import userPhoto from '../../assets/images/no_avatar.png';
import ProfileStatusWithHooks from '../Profile/ProfileInfo/ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';

const SettingsProfile = (props) => {
    return (
        <div>
            <Settings isOwner={props.isOwner} profile={props.profile} status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile} />
        </div>
    );
}

const Settings = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData);
    }
    if (!profile) {
        return <Preloader />
    }
    debugger;
    return (
        <div>
            {isOwner && <div className={classes.settingBlock}>
                <div className={classes.profileBLock}>
                    <div className={classes.profileInner}>
                        <img src={profile.photos.large || userPhoto} />
                        <div className={classes.fileInputBlock}>
                            <input className={classes.fileInput} type={"file"} id="avatar" onChange={onPhotoSelected} />
                            <label for="avatar">Upload file</label>
                        </div>
                    </div>
                    <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                </div>
            </div>}
        </div>
    );
}



export default SettingsProfile;