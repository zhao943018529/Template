import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import createRoutes from '../routes';
import Header from '../components/Header';
import RegisterAndLogin from '../components/RegisterAndLogin';
import Dialog from '../controls/Dialog';
import Loading from '../controls/Loading';
import { createRequest } from '../utilities/fetch';
import {
    fetch_user_success,
    fetch_user_start,
    fetch_user_error
} from '../reducer/UserReducer';

import { modal_close } from '../reducer/LoginRegisterReducer';
import { reset_status, success_status, failed_status } from '../reducer/MessageReducer';
import LightTip from '../controls/LightTip';

const FETCH_USER_URL = "/api/getLoginUser";

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.closeLoginDialog = this.closeLoginDialog.bind(this);
    }
    componentDidMount() {
        this.props.history.listen(() => {
            this.props.dispatch(
                createRequest(FETCH_USER_URL, {
                    credentials: 'same-origin'
                }, {
                        success: fetch_user_success,
                        failed: fetch_user_error,
                    })
            );
        });

        this.props.dispatch(
            createRequest(FETCH_USER_URL, {
                credentials: 'same-origin'
            }, {
                    success: fetch_user_success,
                    failed: fetch_user_error,
                })
        );
    }

    closeLoginDialog() {
        this.props.dispatch(modal_close());
    }

    render() {
        let user = this.props.user;
        let content;

        if (user.status === 0 || user.status === 1) {
            content = (
                <Loading />
            );
        } else {

            let routes = createRoutes(this.props.store);
            content = (
                <Switch>
                    {routes.map(route => {
                        return <Route {...route} />
                    })}
                </Switch>
            );
        }

        let tip;
        let msg = this.props.msg;
        if (msg.status === 1) {
            tip = (<LightTip type='success' message={msg.message} didUnMount={() => { this.props.store.dispatch(reset_status()); }} />);
        } else if (msg.status === 2) {
            tip = (<LightTip type='failed' message={msg.message} didUnMount={() => { this.props.store.dispatch(reset_status()); }} />);
        }
        let login = this.props.login;
        let loginView;
        if (login.status === 1) {
            loginView = (
                <Dialog Style={{ width: 400 }} Title='Sign in' Close={this.closeLoginDialog}>
                    <RegisterAndLogin type="login" success={this.closeLoginDialog} dispatch={this.props.dispatch} url={this.props.history.location.pathname} />
                </Dialog>
            );
        } else if (login.status === 2) {
            loginView = (
                <Dialog Style={{ width: 600 }} Title='Get start' Close={this.closeLoginDialog}>
                    <RegisterAndLogin type="register" dispatch={this.props.dispatch} />
                </Dialog>
            );
        }

        return (
            <Router history={this.props.history}>
                <div className="app-container">
                    <Header history={this.props.history} user={user} />
                    <main className="main-container maxWidth1000 u-marginAuto">
                        {content}
                        {tip}
                        {loginView}
                    </main>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    msg: state.msg,
    login: state.login,
});

export default connect(mapStateToProps)(AppContainer);