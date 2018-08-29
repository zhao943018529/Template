import React from 'react';
import { findDOMNode } from 'react-dom';
import Portal from './Portal';

//type:Error Success 

export default class LightTip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
        this.timeId = null;
        this.getContainer = this._getContainer.bind(this);
        this.delayDestroyTip = this._delayDestroyTip.bind(this);
        this.handlePortalUpdate = this._handlePortalUpdate.bind(this);
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
        this.setState({
            show: false,
        }, () => {
            let didUnMount = this.props.didUnMount;
            if (didUnMount) {
                didUnMount();
            }
        });
    }

    _getContainer() {
        let container = document.createElement("div");
        container.className = `lighttip ${this.props.type === 'success' ? 'lighttip-success' : 'lighttip-error'}`;
        document.body.appendChild(container);
        return container;
    }

    render() {
        if (this.state.show) {
            let iconClassName = `lighttip-icon fa fa-${this.props.type === 'success' ? 'check' : 'times'}`;
            
            return (
                <Portal getContainer={this.getContainer} didUpdate={this.handlePortalUpdate}>
                    <i className={iconClassName} aria-hidden="true"></i>
                    <span className="lighttip-content">{this.props.message}</span>
                </Portal>
            );
        } else {
            return null;
        }
    }
}