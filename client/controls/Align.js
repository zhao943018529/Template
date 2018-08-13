import React from 'react';
import {findDOMNode} from 'react-dom';
import { getOffset } from '../utilities/Html';

export default class Align extends React.Component {

    getPopUpDomNode(){
        return findDOMNode(this);
    }

    componentDidMount() {
        let align = this.props.getAlignElement();
        if (align) {
            let height = align.offsetHeight;
            let width = align.offsetWidth;
            let layout = getOffset(align);
            layout.width = width;
            layout.height = height;
            let target = this.getPopUpDomNode().offsetParent;
            target.style.left = layout.left + "px";
            target.style.top = layout.top + height + "px";
            target.style.width = width + "px";
        }
    }

    render() {
        return React.cloneElement(this.props.children);
    }
}