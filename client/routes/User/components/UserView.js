import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';

export default class UserView extends React.Component {

    createUserInfo() {

        return (
            <div className="user-info-block">
                <div className="avatar"></div>
                <div className="user-info info-box">
                    <h2>{this.props.user.nickname}</h2>
                </div>
                <div className="action-box info-box">
                    <button type="button" className="btn btn-outline-primary">Edit profile</button>
                </div>
            </div>
        );
    }

    createNav() {
        return (
            <nav className="user-action-nav">
                <ul className="nav nav-list">
                    <div className="avatar">
                    </div>
                    <li className="nav-item u-flexCenter">
                        <i className="link-icon fa fa-pencil-square-o" aria-hidden="true"></i>
                        <a className="title right" href="#">
                            write article</a>
                    </li>
                </ul>
            </nav>
        );
    }

    createRoutes() {
        const { match } = this.props;
        return (
            <div>
                {routes.map(route => {
                    return <Route {...route} path={`${match.path}${route.path}`} />
                })}
            </div>
        );
    }

    render() {

        return (
            <div className="view-user">
                <div className="major-view">
                    {this.createUserInfo()}
                    {this.createNav()}
                    {this.createRoutes()}
                </div>
                <div className="minor-view">
                </div>
            </div>
        );
    }
}