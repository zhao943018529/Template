import React from 'react';
import _ from 'lodash';
import { fetchData } from '../utilities/fetch';
import { login_open } from '../reducer/LoginRegisterReducer';

export default class SubComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            comments: [],
            replyTo: null,
            message: '',
        };

        this.handleReplyTo = this.handleReplyTo.bind(this);
        this.fetchSuccess = this.fetchSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.postSuccess = this.postSuccess.bind(this);
    }
    componentDidMount() {
        this.syncData();
    }

    syncData() {
        let url = `/api/comment/getCommentsByPId/${this.props.pid}`;
        fetchData(url, [
            this.fetchSuccess,
            this.handleError
        ]);
    }

    fetchSuccess(res) {
        this.setState({
            status: 2,
            comments: res.data,
            message: res.message,
        });
    }

    handleError(err) {
        this.setState({
            status: 3,
            message: err.message,
        });
    }

    createSubComment(comment) {
        let content;
        if (comment.responseTo) {
            content = (
                <div className="comment-content">
                    Reply <a href="#">{comment.responseTo.nickname}</a>: <span>{comment.body}</span>
                </div>
            );
        } else {
            content = (
                <div className="comment-content">
                    <span>{comment.body}</span>
                </div>
            );
        }

        return (
            <li key={comment.id} className="sub-comment-item">
                <div className="sub-comment">
                    <div className="user-portrait float-left">
                        <div className="avatar"></div>
                    </div>
                    <div className="content-box">
                        <div className="header">
                            <div className="user-info">
                                <a href="#" className="username">{comment.author.nickname}</a>
                            </div>
                        </div>
                        {content}
                        <div className="comment-footer">
                            <span className="date">3 minitues ago</span>
                            <a href="#" data-id={comment.id} onClick={this.handleReplyTo} className="reply-btn">Reply</a>
                        </div>
                    </div>
                </div>
            </li>
        );
    }

    handleReplyTo(event) {
        if (this.props.uid) {
            let current = event.currentTarget;
            let id = current.dataset['id'];
            let comment = _.find(this.state.comments, comment => comment.id === id);
            this.setState({
                replyTo: comment,
            });
        }
        event.preventDefault();
    }

    onValueChange(event) {
        let value = event.target.value;
        this.setState({
            body: value,
        });
    }

    postSuccess(res) {
        if (res.status === 300) {
            this.setState({
                status: 3,
                message: res.message,
            });
        } else {
            this.setState({
                status: 2,
                body: '',
                message: res.message,
                replyTo: null,
            }, () => {
                this.syncData();
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.props.uid) {
            this.props.dispatch(login_open());
            return;
        }
        if (!this.state.body) {
            this.setState({
                status: 3,
                message: 'comment not allow empty comment',
            });
            return;
        }
        fetchData(`/api/comment/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pid: this.props.pid,
                author: this.props.uid,
                body: this.state.body,
                responseTo: this.state.replyTo ? this.state.replyTo.author.id : null,
            })
        }, [this.postSuccess, this.handleError]);
    }

    createEmptyComment() {

        return (
            <div className="empty-comment">
                <dl>
                    <dt>
                        <i className="fa fa-comments" aria-hidden="true"></i>
                    </dt>
                    <dd>no comment yet</dd>
                </dl>
            </div>
        );
    }

    render() {
        let { comments, replyTo } = this.state;
        let content;
        if (comments.length > 0) {
            content = comments.map(comment => this.createSubComment(comment));
        } else {
            content = this.createEmptyComment();
        }

        let placeholder = "input your comment";
        if (this.state.replyTo) {
            placeholder = `replay to ${this.state.replyTo.author.nickname}`;
        }

        return (
            <div className="sub-comment-box">
                <div className="sub-comment-inner">
                    <ul className="sub-comment-list">
                        {content}
                    </ul>
                    <form className="reply-form form-group" onSubmit={this.handleSubmit}>
                        <textarea rows={1} onChange={this.onValueChange} placeholder={placeholder}></textarea>
                        <button className="btn btn-primary" type="submit">Reply</button>
                    </form>
                </div>
            </div>
        );
    }
}