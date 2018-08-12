import React from 'react';
import {findDOMNode} from 'react-dom';
import Align from './Align';
import Portal from './Portal';
import DropDownPane from './DropDownPane';

export default class Trigger extends React.Component {
    constructor(props) {
        super(props);
        this.getRootElement = this._getRootElement.bind(this);
        this.getContainer = this._getContainer.bind(this);
    }

    _getRootElement() {
        return findDOMNode(this);
    }

    _getContainer() {
        let mountNode = document.createElement('div');
        mountNode.className = "select-dropdown";
        mountNode.style.position = "absolute";
        mountNode.style.top = "0";
        mountNode.style.left = "0";
        let parentNode = this.props.getPopupContainer ?
            this.props.getPopupContainer(ReactDOM.findDOMNode(this)) : document.body;
        parentNode.appendChild(mountNode);
        return mountNode;
    }

    render() {

        return this.props.Visiable ? (
            <Portal getContainer={this.getContainer}>
                <Align getRootElement={this.getRootElement} AlignElement={this.props.AlignElement}>
                    <DropDownPane onValueChange={this.props.onValueChange} ActiveIndex={this.props.ActiveIndex} Options={this.props.Options} Value={this.props.Value} />
                </Align>
            </Portal>
        ) : null;
    }
}
