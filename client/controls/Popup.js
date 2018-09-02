import React from 'react';
import Align from './Align';
import PopupInner from './PopupInner';
export default class Popup extends React.Component {

    render() {
        let { getAlignElement, visible } = this.props;

        return (
            <Align
                key="popup"
                target={getAlignElement}
                disabled={!!visible}
            >
                <PopupInner visible={visible}>
                    {this.props.children}
                </PopupInner>
            </Align>
        );
    }
}