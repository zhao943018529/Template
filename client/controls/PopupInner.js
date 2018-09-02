import React from 'react';

export default class PopupInner extends React.Component {

    render() {
        let { children, style, visible } = this.props;
        let newStyle = {
            ...style,
            display: visible ? 'block' : 'none',
        }
        return (
            <div className="select-dropdown" style={newStyle}>
                {children}
            </div>
        );
    }
}