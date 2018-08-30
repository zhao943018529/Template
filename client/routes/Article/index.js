import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import QuillEditor from '../../controls/QuillEditor';
import Loading from '../../controls/Loading';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';
import { fetchData, createRequest } from '../../utilities/fetch';
import { fetch_comments_failed, fetch_comments_success, fetch_comments_start } from '../../reducer/CommentReducer';

class ArticleView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            article: null,
            message: '',
        };
        this.fetch_error = this.fetch_error.bind(this);
        this.fetch_success = this.fetch_success.bind(this);
        this.syncComments = this.syncComments.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        fetchData(`/api/article/getArticle/${id}`, [
            this.fetch_success, this.fetch_error
        ]);
    }

    fetch_success(res) {
        let article = res.data;
        article.content = JSON.parse(article.content);
        article.updatedAt = moment(new Date(article.updatedAt)).format('YYYY-MM-DD HH:MM');
        this.setState({
            status: 2,
            article: article,
            message: res.message,
        }, () => {
            this.props.dispatch(fetch_comments_success({
                data: article.comments,
                message: 'fetch comments successfully',
            }));
        });
    }

    fetch_error(err) {
        this.setState({
            status: 3,
            message: err.message,
        });
    }

    createAuthorInfo(author, date) {
        return (
            <div className="author-info">
                <a className="author-portrait" href="#">
                    <div className="avatar"></div>
                </a>
                <div className="author-box">
                    <a href="#" className="username ellipsis">{author.nickname}</a>
                    <div className="meta-box">
                        <time className="time">{date}</time><span className="view-count">read 100</span>
                    </div>
                </div>
            </div>
        );
    }

    syncComments() {
        let url = `/api/comment/getCommentsByAId/${this.state.article.id}`;
        this.props.dispatch(createRequest(url, {
            start: fetch_comments_start,
            success: fetch_comments_success,
            failed: fetch_comments_failed,
        }));
    }

    createArticleArea() {
        let article = this.state.article;
        let user = this.props.user.user;
        let uid = user && user.id;

        return (
            <div className="article-area">
                <article className="article">
                    {this.createAuthorInfo(article.author, article.updatedAt)}
                    <h1 className="article-title">{article.title}</h1>
                    <div className="article-content">
                        <QuillEditor readOnly={true} value={article.content} />
                    </div>
                </article>
                <div className="comment-box">
                    <CommentForm url='/api/comment/add' uid={uid} aid={this.state.article.id} success={this.syncComments} dispatch={this.props.dispatch} />
                    <CommentList aid={article.id} comments={this.props.comment.comments} uid={uid} dispatch={this.props.dispatch} />
                </div>
            </div>
        );
    }

    render() {
        let status = this.state.status;
        let content = status === 2 ? this.createArticleArea() : <Loading />;

        return (
            <div className="column-view">
                {content}
                <div className="sliderbar">

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    comment: state.comment,
});

export default connect(mapStateToProps)(ArticleView);