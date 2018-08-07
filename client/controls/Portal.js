import React from 'react';
import ReactDOM from 'react-dom';



export default class Portal extends React.Component{
    componentDidMount(){
        this.createContainer();
    }

    componentWillUnmount(){
        this.removeContainer();
    }

    createContainer(){
        this.container = this.props.getContainer();
        this.forceUpdate();
    }

    removeContainer(){
        this.container && document.body.removeChild(this.container)
    }


    render() {
        return this.container ?
            ReactDOM.createPortal(this.props.children, this.container) : null;
    }
}