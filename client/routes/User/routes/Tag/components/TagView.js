import React from 'react';
import {fetch_tags_start,fetch_tags_success,fetch_tags_failed} from '../../../../../reducer/TagReducer';

export default class Tag extends React.Component{

    componentDidMount(){
        this.props.createRequest('/tag/getTags',{
            start:fetch_tags_start,
            success:fetch_tags_success,
            failed:fetch_tags_failed,
        });
    }

    createTags() {
        let items = this.props.tag.tags.map(tag => this.createTag(tag));

        return (
            <div>
                {items}
            </div>
        );
    }

    createTag(tag) {

        return (
            <div key={tag.id} className="card tag-card fl" style="width:18rem">
                <div className="card-header d-flex justify-content-between align-items-center border-success">
                    <h5>{tag.name}</h5>
                    <div>
                        <button type="button" className="btn">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button type="button" className="btn">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">{tag.description}</p>
                </div>
            </div>
        );
    }

    render(){
        let content;
        if(this.props.tag.status===2){
            content=this.createTags();
        }else{
            content=(
                <div>no data</div>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}