import React from 'react';
import { findDOMNode } from 'react-dom';
import { getOffset } from '../utilities/Html';

export default class Align extends React.Component {

    componentDidMount() {
        // let align = this.props.getAlignElement();
        // if (align) {
        //     let height = align.offsetHeight;
        //     let width = align.offsetWidth;
        //     let layout = getOffset(align);
        //     layout.width = width;
        //     layout.height = height;
        //     let target = this.getPopUpDomNode().offsetParent;
        //     let pl = getOffset(target.offsetParent);
        //     target.style.left = layout.left - pl.left + "px";
        //     target.style.top = layout.top - pl.top + height + "px";
        //     target.style.width = width + "px";
        // }
        this.forceAlign();
    }

    componentDidUpdate(preProps) {
        if (this.props.disabled && !preProps.disabled) {
            this.forceAlign();
        }
    }

    forceAlign(){
        let {target} = this.props;
        if(target){
            const source = findDOMNode(this);
            let element = target();
            if(element){
                let height = element.offsetHeight;
                let width = element.offsetWidth;
                let layout = getOffset(element);
                let op = source.offsetParent;
                let pl = getOffset(op);
                source.style.left = layout.left - pl.left + "px";
                source.style.top = layout.top - pl.top + height + "px";
                source.style.width = width + "px";
            }
        }
    }

    render() {

        return React.cloneElement(this.props.children);
    }
}