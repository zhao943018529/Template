import React from 'react';
import {findDOMNode} from 'react-dom';
import Align from './Align';
import Portal from './Portal';
import DropDownPane from './DropDownPane';

export default class Trigger extends React.Component {
    constructor(props) {
        super(props);
        this.getAlignElement = this._getAlignElement.bind(this);
        this.getContainer = this._getContainer.bind(this);
    }

    _getAlignElement() {
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
        const newChildProps = { key: 'trigger' };
        let child = React.Children.only(this.props.children);
        let trigger = React.cloneElement(child,newChildProps);
        let portal;
        if(this.props.Visiable){
            portal =(
                <Portal key='portal' getContainer={this.getContainer}>
                    <Align getAlignElement={this.getAlignElement}>
                        {this.props.PopUp}
                    </Align>
                </Portal>
            );
        }

        return [
            trigger,
            portal,
        ];
    }
}
