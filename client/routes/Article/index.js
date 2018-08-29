import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import QuillEditor from '../../controls/QuillEditor';
import Loading from '../../controls/Loading';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';
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

    createArticleArea() {
        let article = this.state.article;
        let user = this.props.user.user;
        let uid = user && user.id;

        return (
            <article className="article">
                {this.createAuthorInfo(article.author, article.updatedAt)}
                <h1 className="article-title">{article.title}</h1>
                <div className="article-content">
                    <QuillEditor readOnly={true} value={article.content} />
                </div>
                <div className="comment-box">
                    <CommentForm url='/api/comment/add' uid={uid} aid={this.state.article.id} dispatch={this.props.dispatch} />
                    <CommentList aid={article.id} uid={uid} dispatch={this.props.dispatch} />
                </div>
            </article>
        );
    }

    render() {
        let status = this.state.status;
        let content = status === 2 ? this.createArticleArea() : <Loading />;

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

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(ArticleView);