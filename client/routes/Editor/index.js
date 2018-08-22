import React from 'react';
import {connect} from 'react-redux';
import TagControl from '../../controls/TagControl';
import QuillEditor from '../../controls/QuillEditor';


class Editor extends React.Component {
    constructor(props){
        super(props);
        this.state={
            status:0,
            formData:{
                tags:[],
            },
            message:'',
        };
        this.handleTagsChange = this.handleTagsChange.bind(this);
    }

	handleTagsChange(ids){
		let formData = this.state.formData;
		formData.tags = ids;
		this.setState({
			formData:formData,
		});
	}

    render() {
        let formData = this.state.formData;

        return (
            <div className="view-editor">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="input article title..." />
                    </div>
                    <div className="form-group">
                        <TagControl onValueChange={this.handleTagsChange} selected={formData.tags} tags={this.props.tag.tags} />
                    </div>
                    <QuillEditor />
                    <div className="publish-footer">
                        <div className="container">
                            <div className="operations clearfix">
                                <div className="float-right">
                                    <button className="btn btn-primary" type="submit">Button</button>
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
