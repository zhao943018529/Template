import React from 'react';
import {Router,Switch,Route} from 'react-router-dom';
import createRoutes from '../routes';
import history from '../history';
import Header from '../components/Header';
import { createRequest } from '../utilities/fetch';
import {
    fetch_user_success,
    fetch_user_start,
    fetch_user_error
} from '../reducer/UserReducer';

const FETCH_USER_URL = "/api/getLoginUser";

export default class AppContainer extends React.Component{
    componentWillMount() {
        this.props.store.dispatch(
            createRequest(FETCH_USER_URL, {
                credentials: 'same-origin'
            }, {
                    success: fetch_user_success,
                    failed: fetch_user_error,
                })
        );
    }

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
    }

    render(){
        let routes = createRoutes(this.props.store);

        return (
            <Router history={history}>
                <div className="app-container">
                    <Header history={history}/>
                    <main className="main-container maxWidth1000 u-marginAuto">
                        <Switch>
                        {routes.map(route=>{
                            return <Route {...route}/>
                        })}
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
}