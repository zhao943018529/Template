import React from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../utilities/fetch';
import Dialog from '../controls/Dialog';
import RegisterAndLogin from './RegisterAndLogin';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.fetchSuccess = this._fetchSuccess.bind(this);
        this.fetchFailed = this._fetchFailed.bind(this);
        this.state = {
            status: 0,
            categories: [],
            message: '',
        };

        this.closeDialog = this._closeDialog.bind(this);
        this.previousURL = this.props.history.location.pathname;
    }

    componentDidMount() {
        fetchData('/api/category/getAll', [this.fetchSuccess, this.fetchFailed]);
    }

    _fetchSuccess(result) {
        this.setState({
            status: 1,
            categories: result.data,
        });
    }

    _fetchFailed(result) {
        this.setState({
            status: 3,
            message: result.message,
        });
    }

    handleClick(path, event) {
        this.props.history.push(path);
        event.preventDefault();
    }

    createNav() {
        let status = this.state.status;
        let content;
        if (status === 0) {
            content = (<div>no data</div>);
        } else if (status === 3) {
            content = (<div>{this.state.message}</div>);
        } else {
            content = this.state.categories.map(category => this.createLink(category));
        }

        return (
            <div className="navigation-container maxWidth1000 u-marginAuto">
                <ul className="nav">
                    {content}
                </ul>
            </div>
        );
    }

    createLink(category) {
        let path = `/${category.prefix}/${category.name}`;

        return (
            <li key={category.id} className="nav-item">
                <a className="nav-link" onClick={this.handleClick.bind(this, path)} href="#">{category.displayName}</a>
            </li>
        );
    }

    createButtonSet() {
        let user = this.props.user;
        let content;
        if (user.user) {
            content = (
                <div className="d-inline">
                    <button type="button" onClick={() => this.props.history.push(`/u/${user.user.username}__${user.user.id}`)} className="btn btn-link">
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                    </button>
                </div>
            );
        } else {
            content = (
                <div className="d-inline">
                    <button type="button" onClick={() => this.setState({ status: 4 })} className="btn btn-link noText-decoration verticalAlign-middle">Sign in</button>
                    <button type="button" onClick={() => this.setState({ status: 5 })} className="btn btn-outline-primary verticalAlign-middle">Get started</button>
                </div>
            );
        }

        return (
            <div className="buttonSet">
                <label className="search-button verticalAlign-middle">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <input type="search" placeholder="Search Blog" className="form-control form-control-sm" />
                </label>
                {content}
            </div>
        );
    }

    _closeDialog(e) {
        this.setState({
            status: 1,
        });

        e.stopPropagation();
    }

    render() {
        let status = this.state.status;
        let title;
        let type;
        if (status === 4) {
            title = "Sign in";
            type = "login";
        } else if (status === 5) {
            title = "Get started";
            type = "register";
        }
        let dialog;
        if (title) {
            dialog = (
                <Dialog ClassName="top" Style={{ width: 600 }} Title={title} Close={this.closeDialog}>
                    <RegisterAndLogin type={type} />
                </Dialog>
            );
        }

        return (
            <div className="metabar">
                <div className="metabar-header maxWidth1000 u-flexCenter">
                    <div className="metabar-block u-flex1  d-xs-block">
                    </div>
                    <div className="metabar-logo">
                        <a href="#" className="metabar-img">
                            <img src="https://www.seoclerk.com/pics/579352-15CTfd1515601765.png" alt="" />
                        </a>
                    </div>
                    <div className="metabar-block u-flex0">
                        {this.createButtonSet()}
                    </div>
                </div>
                {this.createNav()}
                {dialog}
            </div>
        );
    }
}