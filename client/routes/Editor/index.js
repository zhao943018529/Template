import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Map, List, fromJS, Seq } from 'immutable';
import TagControl from '../../controls/TagControl';
import QuillEditor from '../../controls/QuillEditor';
import Select from '../../controls/Select';
import _ from 'lodash';
import { fetchData } from '../../utilities/fetch';


function fromJSGreedy(js) {
    return typeof js !== 'object' || js === null ? js :
        Array.isArray(js) ?
            Seq(js).map(fromJSGreedy).toList() :
            Seq(js).map(fromJSGreedy).toMap();
}

const themes = [
    {
        id: 1,
        value: 'snow',
        displayName: 'Snow',
    }, {
        id: 2,
        value: 'bubble',
        displayName: 'Bubble',
    }];

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            formData: Map({
                id: null,
                title: '',
                tags: List([]),
                content: Map(),
            }),
            theme: "snow",
            message: '',
        };
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.getPopupContainer = this.getPopupContainer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetDefault = this.resetDefault.bind(this);
        this.postSuccess = this.postSuccess.bind(this);
        this.postError = this.postError.bind(this);
    }

    componentDidMount() {
        let type = this.props.match.params.type;
        if (type === 'edit') {
            let aid = this.props.location.query.aid;
            fetchData(`/api/article/getArticle/${aid}`, [
                this.postSuccess,
                this.postError
            ]);
        }
    }

    handleTagsChange(ids) {
        let formData = this.state.formData;
        let idList = List(ids);
        let fd = formData.set('tags', idList);
        this.setState({
            formData: fd,
        });
    }

    handleTitleChange(event) {
        let value = event.target.value;
        let formData = this.state.formData.set('title', value);
        this.setState({
            formData: formData,
        });
    }

    handleEditorChange(value) {
        let content = fromJS(value);
        let formData = this.state.formData;
        let newFd = formData.set('content', content);
        this.setState({
            formData: newFd,
        });
    }

    onValueChange(value) {
        this.setState({
            theme: value,
        });
    }

    getPopupContainer(node) {
        return node.parentNode.parentNode.parentNode;
    }

    handleSubmit(event) {
        let fd = this.state.formData.toJS();

        fetchData('/api/article/addOrUpdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fd),
        }, [
                this.postSuccess, this.postError
            ]);

        event.preventDefault();
    }

    postSuccess(res) {
        if (res.status === 200) {
            if (this.state.status !== 2 && this.props.match.params.type === 'edit') {
                let article = res.data;
                let fd = this.state.formData.withMutations(map => {
                    map.set('id', article.id).set('title', article.title).set('tags', map.get('tags')
                        .clear().concat(_.map(article.tags, tag => tag.id))).set('content', JSON.parse(article.content));
                });
                this.setState({
                    status: 2,
                    formData: fd,
                    message: res.message,
                });
            } else {
                this.setState({
                    status: 4,
                    message: res.message,
                });
            }
        } else {
            this.setState({
                status: 3,
                message: res.message,
            })
        }
    }

    postError(err) {
        this.setState({
            status: 3,
            message: err.message,
        });
    }

    createForm() {
        let formData = this.state.formData.toJS();
        let msg;
        if (this.state.status === 3) {
            msg = (
                <div className="alert alert-danger" role="alert">
                    {this.state.message}
                </div>
            );
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" onChange={this.handleTitleChange} className="form-control" value={formData.title} placeholder="input article title..." />
                </div>
                <div className="form-group">
                    <TagControl onValueChange={this.handleTagsChange} selected={formData.tags} tags={this.props.tag.tags} />
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Editor theme:</label>
                    <div className="col-sm-10">
                        <Select Options={themes} getPopupContainer={this.getPopupContainer} Style={{ width: 320 }} onValueChange={this.onValueChange} Value={this.state.theme} />
                    </div>
                </div>
                <QuillEditor onTextChange={this.handleEditorChange} value={formData.content} theme={this.state.theme} />
                <div className="publish-footer">
                    <div className="container">
                        <div className="operations clearfix">
                            <div className="float-left">
                                {msg}
                            </div>
                            <div className="float-right">
                                <button className="btn btn-primary" type="submit">Publish</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    resetDefault() {
        let fd = this.state.formData;
        let newTags = fd.get('tags').clear();
        this.setState({
            status: 0,
            formData: Map({
                title: '',
                tags: newTags,
                content: Map(),
            }),
            message: '',
        });
    }

    createPostResponse() {

        return (
            <div className="editor-response d-flex flex-column justify-content-center align-items-center">
                <div className="alert alert-success" role="alert">
                    Congratuation!!!
                </div>
                <button type="button" className="btn btn-success btn-lg" onClick={this.resetDefault}>Write another article</button>
            </div>
        );
    }

    render() {
        let content;
        if (this.state.status === 4) {
            content = this.createPostResponse();
        } else {
            content = this.createForm();
        }
        return (
            <div className="view-editor">
                {content}
            </div>
        );
    }
}

const stateToProps = state => ({
    tag: state.tag,
});

export default connect(stateToProps)(Editor);
