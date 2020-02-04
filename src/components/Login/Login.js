import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, сreateField } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validator/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import classes from "../common/FormsControls/FormControls.module.css";
import styles from "./Login.module.css";


const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return <form onSubmit={handleSubmit}>
        {сreateField("Email", "email", [required], Input)}
        {сreateField("Password", "password", [required], Input, {type: "password"})}
        {сreateField(null, "rememberMe", null, Input, {type: "checkbox"}, "remember me")}
        { error && <div className={classes.formSummaryError}>
            {error}
            </div>
        }
        {captchaUrl && <img src={captchaUrl} />}
        {captchaUrl && 
        сreateField("Symbols from image", "captcha", [required], Input)
            }
        <div>
            <button className={styles.loginBtn}>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div className={styles.loginBlock}>
        <div className={styles.login}>Login</div>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);