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

const FETCH_USER_URL = "/api/getLoginUser";

class AppContainer extends React.Component {

    componentDidMount() {
        history.listen(() => {
            this.props.store.dispatch(
                createRequest(FETCH_USER_URL, {
                    credentials: 'same-origin'
                }, {
                        success: fetch_user_success,
                        failed: fetch_user_error,
                    })
            );
        });

        this.props.store.dispatch(
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

        return (
            <Router history={history}>
                <div className="app-container">
                    <Header history={history} user={user} />
                    <main className="main-container maxWidth1000 u-marginAuto">
                        {content}
                    </main>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(AppContainer);