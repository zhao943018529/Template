import React from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../utilities/fetch';
import Dialog from '../controls/Dialog';
import {serializeArray,serializeObject} from '../utilities/Html';

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
        this.submitEventCallback =this._submitEventCallback.bind(this);
        this.registerSuccess = this._registerSuccess.bind(this);
    }

    componentDidMount() {
        fetchData('/api/category/getAll', [this.fetchSuccess, this.fetchFailed]);
    }

    _fetchSuccess(data) {
        this.setState({
            status: 1,
            categories: data,
        });
    }

    _fetchFailed(err) {
        this.setState({
            status: 3,
            message: err.message,
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
        return (
            <div className="buttonSet">
                <label className="search-button verticalAlign-middle">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <input type="search" placeholder="Search Blog" className="form-control form-control-sm" />
                </label>
                <button type="button" onClick={() => this.setState({ status: 4 })} className="btn btn-link noText-decoration verticalAlign-middle">Sign in</button>
                <button type="button" onClick={() => this.setState({ status: 5 })} className="btn btn-outline-primary verticalAlign-middle">Get started</button>
            </div>
        );
    }

    _closeDialog(e) {
        this.setState({
            status: 1,
        });

        e.stopPropagation();
    }

    _submitEventCallback(event) {
        let data = serializeObject(serializeArray(event.target));
        fetchData('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }, [this.registerSuccess]);
        event.preventDefault();
    }


    _registerSuccess(data){
        console.log(data);
    }

    createRegister() {
        return (
            <form onSubmit={this.submitEventCallback}>
                <div className="form-group">
                    <label htmlFor="nickname-r">Your Nickname</label>
                    <input type="text" name="nickname" className="form-control" id="nickname-r" placeholder="your name or your nickname" />
                    <div class="invalid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="username-r">Username</label>
                    <input type="text" name="username" onBlur={} className="form-control" id="username-r" aria-describedby="usernameHelp" placeholder="username" />
                    <small id="usernameHelp" className="form-text text-muted">.....</small>
                </div>
                <div className="form-group">
                    <label htmlFor="phone-r">Your Phone</label>
                    <input type="number" name="phone" className="form-control" id="phone-r" aria-describedby="phoneHelp" placeholder="phone number" />
                    <small id="phoneHelp" className="form-text text-muted">.....</small>
                </div>
                <div className="form-group">
                    <label htmlFor="email-r">Your Email</label>
                    <input type="email" name="email" className="form-control" id="email-r" aria-describedby="emailHelp" placeholder="email" />
                    <small id="emailHelp" className="form-text text-muted">.....</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password-r">Your Password</label>
                    <input type="password" name="password" className="form-control" id="password-r" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }

    _checkUsernameIsUseable(event){
       let username =  event.target.value;
        fetchData('/api/valiUsername',[])
    }



    createSignIn() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="username-r">Username</label>
                    <input type="text" className="form-control" id="username-r" aria-describedby="usernameHelp" placeholder="username" />
                    <small id="usernameHelp" className="form-text text-muted">.....</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password-r">Your Password</label>
                    <input type="password" className="form-control" id="password-r" placeholder="Password" />
                </div>
            </form>
        );
    }

    render() {
        let status = this.state.status;
        let title;
        let content;
        if (status === 4) {
            title = "Sign in";
            content = this.createSignIn();
        } else if (status === 5) {
            title = "Get started";
            content = this.createRegister();
        }
        let dialog;
        if (title) {
            dialog = (
                <Dialog ClassName="top" Style={{ width: 600 }} Title={title} Close={this.closeDialog}>
                    {content}
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