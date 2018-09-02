import React from 'react';
import { findDOMNode } from 'react-dom';
import Portal from './Portal';
import {isEqual} from 'lodash';

//type:Error Success 

export default class LightTip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            task: {
                type: props.type,
                message: props.message,
                didUnMount: props.didUnMount
            },
        };
        this.timeId = null;
        this.getContainer = this._getContainer.bind(this);
        this.delayDestroyTip = this._delayDestroyTip.bind(this);
        this.handlePortalUpdate = this._handlePortalUpdate.bind(this);
        this.rootRef = React.createRef();
        this.tasks=[];
    }

    componentDidMount() {
        this.timeId = setTimeout(this.delayDestroyTip, 1500);
    }

    componentWillUnmount() {
        this.clearDelayTime();
    }

    clearDelayTime() {
        if (this.timeId) {
            clearTimeout(this.timeId);
        }
    }

    _handlePortalUpdate() {
        let child = findDOMNode(this);
        let parent = child.offsetParent;
        parent.style.marginLeft = -parent.offsetWidth / 2 + 'px';
    }

    _delayDestroyTip() {
        this.clearDelayTime();
        if(this.tasks.length){

        }else{
            
        }
        this.setState({
            show: false,
        }, () => {
            let didUnMount = this.props.didUnMount;
            if (didUnMount) {
                didUnMount();
            }
        });
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextState.show){
            return true;
        }
    }

    getDerivedStateFromProps(nextProps, prevState){
        if(!prevState.show&&!isEqual(nextProps,prevState.task)){
            return {
                show:true,
                ...nextProps,
            };
        }else{
            return null;
        }
    }

    _getContainer() {
        let container = document.createElement("div");
        container.style.position = 'absolute';
        container.style.left = 0;
        container.style.top = 0;
        container.style.width = '100%';
        document.body.appendChild(container);
        return container;
    }

    render() {
        if (this.state.show || this.rootRef.current) {
            let iconClassName = `lighttip-icon fa fa-${this.props.type === 'success' ? 'check' : 'times'}`;

            return (
                <Portal ref={this.rootRef} getContainer={this.getContainer} didUpdate={this.handlePortalUpdate}>
                    <div className={`lighttip ${this.props.type === 'success' ? 'lighttip-success' : 'lighttip-error'}`}>
                        <i className={iconClassName} aria-hidden="true"></i>
                        <span className="lighttip-content">{this.props.message}</span>
                    </div>
                </Portal>
            );
        } else {
            return null;
        }
    }
}