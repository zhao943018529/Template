import React from 'react';
import { findDOMNode } from 'react-dom';
import Portal from './Portal';
import { isEqual } from 'lodash';

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
        this.tasks = [];
    }

    componentDidMount() {
        this.timeId = setTimeout(this.delayDestroyTip, 1500);
    }

    componentWillUnmount() {
        this.clearDelayTime();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.show && this.tasks.length) {
            this.setState({
                show: true,
                task: this.tasks.shift(),
            }, () => {
                this.timeId = setTimeout(this.delayDestroyTip, 1500);
            });
        }
    }

    clearDelayTime = () => {
        if (this.timeId) {
            clearTimeout(this.timeId);
            this.timeId = null;
        }
    }

    _handlePortalUpdate() {
        let root = findDOMNode(this);
        root.style.marginLeft = -root.offsetWidth / 2 + 'px';
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

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.show && isEqual(nextState.task, this.state.task)) {
            this.tasks.push(nextProps);
            return false;
        }

        return true;
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
            let task = this.state.task;
            let iconClassName = `lighttip-icon fa fa-${task.type === 'success' ? 'check' : 'times'}`;

            return (
                <Portal ref={this.rootRef} getContainer={this.getContainer} didUpdate={this.handlePortalUpdate}>
                    <div className={`lighttip ${task.type === 'success' ? 'lighttip-success' : 'lighttip-error'}`}>
                        <i className={iconClassName} aria-hidden="true"></i>
                        <span className="lighttip-content">{task.message}</span>
                    </div>
                </Portal>
            );
        } else {
            return null;
        }
    }
}