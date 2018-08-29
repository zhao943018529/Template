import React from 'react';
import SubComments from './SubComments';


export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
        };
        this.toggleSubComments = this.toggleSubComments.bind(this);
    }

    toggleSubComments(event) {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    }

    createComment() {
        let comment = this.props.comment;
        let subComment;
        let arrow;
        if (this.state.isExpanded) {
            subComment = (<SubComments pid={comment.id} uid={this.props.uid} dispatch={this.props.dispatch} />);
            arrow = (<div className="sub-comment-arrow"></div>);
        }

        return (
            <div className="comment">
                <div className="user-portrait">
                    <a href="#">
                        <div className="avatar"></div>
                    </a>
                </div>
                <div className="content-box">
                    <div className="header">
                        <div className="user-info">
                            <a className="username" href="">{comment.author.nickname}</a>
                        </div>
                    </div>
                    <div className="comment-content">
                        <span>{comment.body}</span>
                    </div>
                    <div className="comment-footer">
                        <span className="sub-comment-btn" onClick={this.toggleSubComments}>
                            <i className="fa fa-comment-o btn-icon" aria-hidden="true"></i>
                            <span className="title">close comment</span>
                            {arrow}
                        </span>
                        <span className="date">3 hours ago</span>
                    </div>
                    {subComment}
                </div>
            </div>
        );
    }

    render() {
        return (
            <li className="comment-item">
                {this.createComment()}
            </li>
        );
    }
}