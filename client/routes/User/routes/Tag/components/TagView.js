import React from "react";
import Loading from "../../../../../controls/Loading";
import LightTip from "../../../../../controls/LightTip";
import { Map, fromJS } from "immutable";
import { fetchData } from "../../../../../utilities/fetch";
import {
    fetch_tags_start,
    fetch_tags_success,
    fetch_tags_failed
} from "../../../../../reducer/TagReducer";

export default class Tag extends React.Component {
    constructor(props) {
        super(props);

        this.defaultTag = Map({
            id: "",
            name: "",
            description: ""
        });

        this.state = {
            status: 0,
            times: 0,
            IsExpandCard: false,
            tag: Map({
                id: "",
                name: "",
                description: ""
            }),
            message: ""
        };
        this.addTagCallback = this._addTagCallback.bind(this);
        this.enterEditMode = this._enterEditMode.bind(this);
        this.cancelAddTag = this._cancelAddTag.bind(this);
        this.postStart = this._postStart.bind(this);
        this.postSuccess = this._postSuccess.bind(this);
        this.postFailed = this._postFailed.bind(this);
        this.existEditMode = this._existEditMode.bind(this);
        this.saveTag = this._saveTag.bind(this);
        this.deleteTag = this._deleteTag.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.props.createRequest("/api/tag/getTags", {
            start: fetch_tags_start,
            success: fetch_tags_success,
            failed: fetch_tags_failed
        });
    }

    createTags() {
        let items = this.props.tag.tags.map(tag => this.createTag(tag));

        return (
            <div className="d-flex flex-wrap align-items-start justify-content-between align-content-between">
                {items}
            </div>
        );
    }

    createTag(tag) {
        let id = this.state.tag.get("id");
        if (id && id === tag.id) {
            return this.createEditTagCard(this.state.tag.toJS());
        } else {
            return (
                <div key={tag.id} className="card tag-card" style={{ width: "18rem" }}>
                    <div className="card-header d-flex justify-content-between align-items-center border-success">
                        <h5>{tag.name}</h5>
                        <div>
                            <button
                                type="button"
                                className="btn"
                                data-id={tag.id}
                                onClick={this.enterEditMode}
                            >
                                <i className="fa fa-pencil" aria-hidden="true" />
                            </button>
                            <button data-id={tag.id} type="button" className="btn ml-1" onClick={this.deleteTag}>
                                <i className="fa fa-trash" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{tag.description}</p>
                    </div>
                </div>
            );
        }
    }

    _deleteTag(event) {
        let current = event.currentTarget;
        let id = current.dataset['id'];
        let url = `/api/tag/delTag?id=${id}`;
        fetchData(url, [
            this.postStart, this.postSuccess, this.postFailed
        ]);
    }

    _enterEditMode(event) {
        let current = event.currentTarget;
        let id = current.dataset["id"];
        let tag = this.props.tag.tags.find(tag => tag.id === id);
        let newTag = Map({
            id: tag.id,
            name: tag.name,
            description: tag.description
        });
        this.setState({ tag: newTag });
        event.stopPropagation();
    }

    createEditTagCard(tag) {
        let tip;
        if (this.state.status === 1) {
            tip = (<Loading />);
        }

        return (
            <div key={tag.id} className="card tag-card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className="card-title">
                        <label htmlFor="tagName">Name</label>
                        <input
                            type="text"
                            value={tag.name}
                            className="form-control"
                            onChange={this.handleValueChange.bind(this, "name")}
                            id="tagName"
                            placeholder="tag name"
                            value={tag.name}
                            required="true"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tagDescription">Description</label>
                        <textarea
                            className="form-control"
                            value={tag.description}
                            onChange={this.handleValueChange.bind(this, "description")}
                            id="tagDescription"
                            rows="3"
                        />
                    </div>
                    <div className="btn-group float-right">
                        <button className="btn btn-light" onClick={this.saveTag}>
                            Save
                        </button>
                        <button
                            className="btn btn-light ml-1"
                            onClick={this.state.IsExpandCard ? this.cancelAddTag : this.existEditMode}
                        >
                            Cancel
                        </button>
                    </div>
                    {tip}
                </div>
            </div>
        );
    }

    _existEditMode() {
        let newTag = this.state.tag.merge(this.defaultTag);
        this.setState({ status: 0, tag: newTag, message: '' });
    }

    _cancelAddTag() {
        this.setState({
            IsExpandCard: false,
        });
    }

    _saveTag() {
        let tag = this.state.tag.toJS();
        let url;
        if (tag.id) {
            url = "/api/tag/updateTag";
        } else {
            url = "/api/tag/addTag";
        }
        fetchData(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tag)
            },
            [this.postStart, this.postSuccess, this.postFailed]
        );
    }

    _postStart() {
        this.setState({ status: 1, times: 0, message: '', });
    }

    _postSuccess(data) {
        let emptyTag = this.state.tag.merge(this.defaultTag);
        let times = this.state.times;
        this.setState(
            {
                status: 2,
                times: ++times,
                IsExpandCard: false,
                tag: emptyTag,
                message: data.message
            },
            () => {
                this.fetchData();
            }
        );
    }

    _postFailed(err) {
        this.setState({
            status: 3,
            times: 1,
            message: err.message
        });
    }

    createNewTag() {
        let tag = this.state.tag.toJS();

        return (
            <div
                className="add-tag-container"
                ref={element => {
                    if (element) {
                        element.style.marginLeft = -element.offsetWidth / 2 + "px";
                        element.style.marginTop = -element.offsetHeight / 2 + "px";
                    }
                }}
            >
                {this.createEditTagCard(tag)}
            </div>
        );
    }

    handleValueChange(key, event) {
        let value = event.target.value;
        let newTag = this.state.tag.set(key, value);
        this.setState({ tag: newTag });
    }

    _addTagCallback() {
        let newTag = this.state.tag.merge(this.defaultTag);
        this.setState({
            IsExpandCard: true,
            tag: newTag
        });
    }

    render() {
        let content;
        if (this.props.tag.status === 2) {
            content = this.createTags();
        } else {
            content = <Loading />;
        }

        let tip;
        if (this.state.times <= 1) {
            if (this.state.status === 2) {
                tip = (<LightTip type="success" message={this.state.message} />);
            } else if (this.state.status === 3) {
                tip = (<LightTip type="failed" message={this.state.message} />);
            }
        }

        let newCardPane;
        if (this.state.IsExpandCard) {
            newCardPane = this.createNewTag();
        }

        return (
            <div className="tag-container">
                <div className="card border-ligh" style={{ width: "100%" }}>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h3>Tag Management</h3>
                        <button type="button" className="btn" onClick={this.addTagCallback}>
                            <i className="fa fa-plus" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="card-body text-dark clearfix">
                        {content}
                        {newCardPane}
                        {tip}
                    </div>
                </div>
            </div>
        );
    }
}
