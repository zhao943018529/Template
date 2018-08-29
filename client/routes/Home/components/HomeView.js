import React from 'react';
import ListView from '../../../components/ListView';
import { fetch_articles_start, fetch_articles_success, fetch_articles_failed } from '../../../reducer/ArticleReducer';
import Loading from '../../../controls/Loading';

export default class HomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.createRequest('/api/article/getByTags?tids=[]', {
            start: fetch_articles_start,
            success: fetch_articles_success,
            failed: fetch_articles_failed,
        });
    }

    createHeader() {
        return (
            <header className="list-header">
                <ul className="nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                </ul>
            </header>
        );
    }

    createArticleList() {
        let article = this.props.article;
        if (article.status === 2) {
            return (<ListView editable={false} articles={article.articles} />);
        } else {
            return (<Loading />);
        }
    }

    render() {
        return (
            <div className="index-view">
                <div className="entry-view">
                    {this.createHeader()}
                    {this.createArticleList()}
                </div>
            </div>
        );
    }
}