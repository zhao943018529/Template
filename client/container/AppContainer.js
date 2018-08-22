import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import createRoutes from '../routes';
import history from '../history';
import Header from '../components/Header';
import Loading from '../controls/Loading';
import { createRequest } from '../utilities/fetch';
import {
    fetch_user_success,
    fetch_user_start,
    fetch_user_error
} from '../reducer/UserReducer';
import { reset_status, success_status, failed_status } from '../reducer/MessageReducer';
import LightTip from '../controls/LightTip';

const FETCH_USER_URL = "/api/getLoginUser";

class AppContainer extends React.Component {

    componentDidMount() {
        history.listen(() => {
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

        return (
            <Router history={history}>
                <div className="app-container">
                    <Header history={history} user={user} />
                    <main className="main-container maxWidth1000 u-marginAuto">
                        {content}
                        {tip}
                    </main>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    msg: state.msg,
});

export default connect(mapStateToProps)(AppContainer);