import React from 'react';
import ListView from '../../../components/ListView';
import _ from 'lodash';
import { fetch_articles_start, fetch_articles_success, fetch_articles_failed } from '../../../reducer/ArticleReducer';
import Loading from '../../../controls/Loading';

export default class TimeLineView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let type = this.props.match.params.type;
        this.syncData(type);
    }

    componentDidUpdate(prevProps, prevState) {
        let oldType = prevProps.match.params.type;
        let newType = this.props.match.params.type;
        if (oldType !== newType) {
            this.syncData(newType);
        }
    }

    syncData(type) {
        let tag = _.find(this.props.tag.tags, tag => {
            return tag.name.toLowerCase() === type;
        });
        let url = `/api/article/getByTag?tid=${tag ? tag.id : ''}`;
        this.props.createRequest(url, {
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