import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import QuillEditor from '../../controls/QuillEditor';
import Loading from '../../controls/Loading';
import { fetchData } from '../../utilities/fetch';

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



    createCommentBox() {
        let user = this.props.user.user;
        let isLogin = !!user;
        let content


        return (
            <div className="comment-box">
                <div className="comment-title">Comment</div>
                <div className="comment-form unauthorized">
                    <div className="unauthorized-panel">
                        <button type="button" className="btn btn-outline-primary btn-sm">Login</button><div className="placeholder">Show your point of view</div>
                    </div>
                </div>
            </div>
        );
    }

    createArticleArea() {
        let article = this.state.article;

        return (
            <article className="article">
                {this.createAuthorInfo(article.author, article.updatedAt)}
                <h1 className="article-title">{article.title}</h1>
                <div className="article-content">
                    <QuillEditor readOnly={true} value={article.content} />
                </div>
            </article>
        );
    }

    render() {
        let content = this.state.status === 2 ? this.createArticleArea() : <Loading />;

        return (
            <div className="column-view">
                <div className="article-area">
                    {content}
                </div>
                <div className="sliderbar">

                </div>
            </div>
        );
    }
}

const mapStateToProps = state=>({
    user:state.user,
});

export default connect(mapStateToProps)(ArticleView);