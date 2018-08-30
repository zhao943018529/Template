import React from 'react';
import { fetchData } from '../utilities/fetch';
import Comment from './Comment';

export default class CommentList extends React.Component {

    render() {
        let comments = this.props.comments;
        let content = comments.map(comment => (
            <Comment key={comment.id}
                comment={comment}
                aid={this.props.aid}
                uid={this.props.uid}
                dispatch={this.props.dispatch} />
        ));

        return (
            <ul className="comment-list">
                {content}
            </ul>
        );
    }
}