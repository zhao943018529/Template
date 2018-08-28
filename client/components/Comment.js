import React from 'react';

export default class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state={
            IsExpanded:false,
            Comments:[],
        }
    }

    componentDidUpdate(){

    }

    createSubComment(){

        return (
            <li className="sub-comment-item">
            <div className="sub-comment">
                <div className="user-portrait float-left">
                    <div className="avatar"></div>
                </div>
                <div className="content-box">
                    <div className="header">
                        <div className="user-info">
                            <a href="" className="username">知乎小前端</a>
                        </div>
                    </div>
                    <div className="comment-content">
                        Reply <a href="#">阿里小前端</a>: <span>already not support ie8</span>
                    </div>
                    <div className="comment-footer">
                        <span className="date">3 minitues ago</span>
                        <a href="#" className="reply-btn">Reply</a>
                    </div>
                </div>
            </div>
        </li>
        )
    }

    createSubComments() {
        return (
            <div className="sub-comment-box">
                <div className="sub-comment-inner">
                    <ul className="sub-comment-list">
                        <li className="sub-comment-item">
                            <div className="sub-comment">
                                <div className="user-portrait float-left">
                                    <div className="avatar"></div>
                                </div>
                                <div className="content-box">
                                    <div className="header">
                                        <div className="user-info">
                                            <a href="" className="username">阿里小前端</a>
                                        </div>
                                    </div>
                                    <div className="comment-content">
                                        <span>already not support ie8</span>
                                    </div>
                                    <div className="comment-footer">
                                        <span className="date">3 minitues ago</span>
                                        <a href="#" className="reply-btn">Reply</a>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                    <form action="" className="reply-form form-group">
                        <textarea rows={1}></textarea>
                        <button className="btn btn-primary" type="submit">Reply</button>
                    </form>
                </div>
            </div>
        );
    }

    createComment() {
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
                            <a className="username" href="">Ninja</a>
                        </div>
                    </div>
                    <div className="comment-content">
                        <span>can support ie8?</span>
                    </div>
                    <div className="comment-footer">
                        <span className="sub-comment-btn">
                            <i className="fa fa-comment-o btn-icon" aria-hidden="true"></i><span className="title">close comment</span>
                            <div className="sub-comment-arrow"></div>
                        </span>
                        <span className="date">3 hours ago</span>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <li className="comment-item">


            </li>
        );
    }
}