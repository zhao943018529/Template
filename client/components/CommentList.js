import React from 'react';
import {fetchData} from '../utilities/fetch';
import Comment from './Comment';

export default class CommentList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            status:0,
            comments:[],
            message:'',
        };
        this.fetchFailed= this.fetchFailed.bind(this);
        this.fetchSuccess = this.fetchSuccess.bind(this);
    }

    componentDidMount(){
        this.syncData();
    }

    syncData(){
        let url = `/api/comment/getCommentsByAId/${this.props.aid}`;
        fetchData(url,[
            this.fetchSuccess,
            this.fetchFailed
        ]);
    }

    fetchSuccess(res){
        this.setState({
            status:2,
            comments:res.data,
            message:res.message,
        })
    }

    fetchFailed(err){
        this.setState({
            status:3,
            message:err.message,
        });
    }

    render() {
        let comments = this.state.comments;
        let content = comments.map(comment => (<Comment key={comment.id} comment={comment} aid={this.props.aid} uid={this.props.uid} dispatch={this.props.dispatch} />));

        return (
            <ul className="comment-list">
                {content}
            </ul>
        );
    }
}