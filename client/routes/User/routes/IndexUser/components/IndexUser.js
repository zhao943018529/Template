import React from 'react';
import ListView from '../../../../../components/ListView';
import {fetch_articles_success,fetch_articles_failed} from '../../../../../reducer/ArticleReducer';

export default class IndexUser extends React.Component {

    componentDidMount() {
        let url = `/api/article/get/${this.props.user.user.id}`;
        this.props.createRequest(url, {}, {
            success: fetch_articles_success,
            failed: fetch_articles_failed,
        });
    }

    render() {
        return (
            <div className="user-my-articles">
                <ListView articles={this.props.article.articles} editable={true} onDelete={(aid) => { console.log(aid); }} />
            </div>
        );
    }
}