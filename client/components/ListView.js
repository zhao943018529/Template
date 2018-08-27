import React from 'react';

export default class ListView extends React.Component {

    constructor(props){
        super(props);

        this.deleteArticle = this.deleteArticle.bind(this);
    }

    createOptPane(aid) {

        return (
            <div className="info-row opt-row">
                <ul className="action-list">
                    <li className="action-item">
                        <a href={`/editor/edit/${aid}`} className="title-box">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li className="action-item">
                        <a onClick={this.deleteArticle} data-aid={aid}  className="title-box">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }

    deleteArticle(event){
        let current =event.currentTarget;
        let aid = current.dataset['aid'];
        this.props.onDelete(aid);
        event.preventDefault();
        event.stopPropagation();
    }

    createTitle(title) {

        return (
            <div className="info-row title-row">
                <span className="title">{title}</span>
            </div>
        );
    }

    createMeta(user, tags) {
        let items = tags.map(tag => (<span key={tag.id}>{tag.name}</span>));

        return (
            <div className="info-row meta-row">
                <ul className="meta-list">
                    <li className="item username">
                        <span>{user.nickname}</span>
                    </li>
                    <li className="item tag">
                        {items}
                    </li>
                </ul>
            </div>
        );
    }

    createArticleItem(article) {
        let url = `/post/${article.id}`;

        return (
            <li key={article.id} className="entry-item">
                <div className="entry-content">
                    <div className="entry-info">
                        <a href={url} className="entry-link">
                            {this.createMeta(article.author, article.tags)}
                            {this.createTitle(article.title)}
                        </a>
                        {this.props.editable ? this.createOptPane(article.id) : undefined}
                    </div>
                </div>
            </li>
        );
    }

    createList() {

        return this.props.articles.map(article => this.createArticleItem(article));
    }

    render() {

        return (
            <ul className="entry-list">
                {this.createList()}
            </ul>
        );
    }
}