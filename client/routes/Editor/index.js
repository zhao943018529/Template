import React from 'react';
import {connect} from 'react-redux';
import { Map, List,fromJS } from 'immutable';
import TagControl from '../../controls/TagControl';
import QuillEditor from '../../controls/QuillEditor';


class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            formData: Map({
                title:'',
                tags: List([]),
                content:Map(),
            }),
            message: '',
        };
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleTitleChange =this.handleTitleChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

	handleTagsChange(ids){
		let formData = this.state.formData;
        let idList = List(ids);
        formData.update('tags',idList);
		this.setState({
			formData:formData,
		});
	}

    handleTitleChange(event){
        let value = event.target.value;
        let formData = this.state.formData.set('title',value);
        this.setState({
            formData:formData,
        });
    }

    handleEditorChange(value) {
        let content = fromJS(value);
        let formData = this.state.formData;
        let newFd = formData.update('content', val => val.mergeDeep(content));
        this.setState({
            formData: newFd,
        });
    }

    render() {
        let formData = this.state.formData.toJS();

        return (
            <div className="view-editor">
                <form>
                    <div className="form-group">
                        <input type="text" onChange={this.handleTitleChange} className="form-control" value={formData.title} placeholder="input article title..." />
                    </div>  
                    <div className="form-group">
                        <TagControl onValueChange={this.handleTagsChange} selected={formData.tags} tags={this.props.tag.tags} />
                    </div>
                    <QuillEditor onTextChange={this.handleEditorChange} value={formData.content}/>
                    <div className="publish-footer">
                        <div className="container">
                            <div className="operations clearfix">
                                <div className="float-right">
                                    <button className="btn btn-primary" type="submit">Publish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const stateToProps = state => ({
    tag: state.tag,
});

export default connect(stateToProps)(Editor);
