import React from 'react';
import { connect } from "react-redux";
import { createRequest } from '../utilities/fetch';
import { Link } from 'react-router-dom';
import Loading from '../controls/Loading';
import Dialog from '../controls/Dialog';
import RegisterAndLogin from './RegisterAndLogin';
import {
    fetch_tags_start,
    fetch_tags_success,
    fetch_tags_failed
} from "../reducer/TagReducer";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            categories: [],
            message: '',
        };

        this.closeDialog = this._closeDialog.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(createRequest("/api/tag/getTags", {
            start: fetch_tags_start,
            success: fetch_tags_success,
            failed: fetch_tags_failed
        }));
    }

    handleClick(path, event) {
        this.props.history.push(path);
        event.preventDefault();
    }

    createNav() {
        let tagData = this.props.tag;
        let content;
        if (tagData.status === 0 || tagData.status === 1) {
            content = (<Loading />);
        } else if (tagData.status === 3) {
            content = (<div>{tagData.message}</div>);
        } else {
            content = tagData.tags.map(tag => this.createLink(tag));
        }

        return (
            <div className="navigation-container maxWidth1000 u-marginAuto">
                <ul className="nav">
                    {content}
                </ul>
            </div>
        );
    }

    createLink(tag) {
        let path = `/channel/${tag.name.toLocaleLowerCase()}`;

        return (
            <li key={tag.id} className="nav-item">
                <a className="nav-link" onClick={this.handleClick.bind(this, path)} href="#">{tag.name}</a>
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
                    <button type="button" onClick={() => this.setState({ status: 2 })} className="btn btn-link noText-decoration verticalAlign-middle">Sign in</button>
                    <button type="button" onClick={() => this.setState({ status: 3 })} className="btn btn-outline-primary verticalAlign-middle">Get started</button>
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
        if (status === 2) {
            title = "Sign in";
            type = "login";
        } else if (status === 3) {
            title = "Get started";
            type = "register";
        }
        let dialog;
        if (title) {
            dialog = (
                <Dialog ClassName="top" Style={{ width: 600 }} Title={title} Close={this.closeDialog}>
                    <RegisterAndLogin type={type} dispatch={this.props.dispatch} />
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


const mapStateToProps = state => ({
    tag: state.tag
});

export default connect(mapStateToProps)(Header);