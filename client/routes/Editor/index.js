import React from 'react';
import QuillEditor from '../../controls/QuillEditor';


export default class Editor extends React.Component{

    render(){

        return (
            <div className="view-editor">
                <QuillEditor />
            </div>
        )
    }
}