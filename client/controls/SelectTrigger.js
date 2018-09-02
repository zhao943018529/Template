import React from 'react';
import ReactDOM from 'react-dom';
import Portal from './Portal';
import DropDownPane from './DropDownPane';
import Popup from './Popup';

export default class SelectTrigger extends React.Component {
    constructor(props) {
        super(props);
        this.popupRef = React.createRef();
        this.getContainer = this.getContainer.bind(this);
    }

    getContainer() {
        let popupContainer = document.createElement('div');
        popupContainer.style.position = "absolute";
        popupContainer.style.top = "0";
        popupContainer.style.left = "0";
        popupContainer.style.width = '100%';
        let parentNode = this.props.getPopupContainer ?
            this.props.getPopupContainer(ReactDOM.findDOMNode(this)) : document.body;
        parentNode.appendChild(popupContainer);
        return popupContainer;
    }

    getRootNode = () => {
        return ReactDOM.findDOMNode(this);
    }

    getComponent() {
        let { options, value, onValueChange, activeIndex, visible, search, onPopupFocus } = this.props;

        return (
            <Popup
                visible={visible}
                getAlignElement={this.getRootNode}
                ref={this.popupRef}
            >
                <DropDownPane
                    visible={visible}
                    onPopupFocus={onPopupFocus}
                    search={search}
                    onValueChange={onValueChange}
                    ActiveIndex={activeIndex}
                    Options={options}
                    Value={value}
                />
            </Popup>
        );
    }


    render() {
        let { visible } = this.props;
        const newChildProps = { key: 'trigger' };
        let child = React.Children.only(this.props.children);
        let trigger = React.cloneElement(child, newChildProps);

        let portal;
        if (visible || this.popupRef.current) {
            portal = (
                <Portal
                    key='portal'
                    getContainer={this.getContainer}
                >
                    {this.getComponent()}
                </Portal>
            );
        }

        return [trigger, portal];
    }
}