import React from 'react';
import Portal from '../controls/Portal';

export default class Dialog extends React.Component{

    constructor(props){
        super(props);
        this.getContainer=this._getContainer.bind(this);
    }

    _getContainer(){
        let container = document.createElement("div");
        let className =`dialog-container ${this.props.ClassName?this.props.ClassName:""}`;
        container.className=className;

        document.body.appendChild(container);

        return container;
    }

    render() {

        return (
            <Portal getContainer={this.getContainer}>
                <div className="dialog">
                    <a className="dialog-close fa fa-times" onClick={this.props.Close} aria-hidden="true"></a>
                    <div className="dialog-header">
                        {this.props.Title}
                    </div>
                    <div className="dialog-body">
                        {this.props.children}
                    </div>
                    <div className="dialog-footer hidden">
                    </div>
                </div>
            </Portal>
        );
    }
}