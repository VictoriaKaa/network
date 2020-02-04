import React from 'react';
import { Route, HashRouter, withRouter, Redirect, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Provider } from "react-redux";
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import UsersContainer from './components/Users/UsersContainer';
import LoginPage from './components/Login/Login';
import { initializeApp } from '../src/redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { withSuspence } from './hoc/withSuspence';
import SettingsContainer from './components/Settings/SettingsContainer';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert("Some error occured");
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    debugger;
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            <Route path='/profile/:userId?' render={withSuspence(ProfileContainer)} />
            <Route path='/dialogs' render={withSuspence(DialogsContainer)} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/settings' render={() => <SettingsContainer />} />
            <Route path='/login' render={() => <LoginPage />} /> 
            <Redirect from="/" to="/profile" />
          </Switch>
        </div>
      </div>);
  }
}
const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})


let AppContainer = compose(withRouter,
  connect(mapStateToProps, { initializeApp }))(App);


const JSApp = (props) => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default JSApp;