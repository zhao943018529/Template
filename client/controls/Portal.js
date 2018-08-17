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

    removeContainer() {
        this.container && this.container.parentNode.removeChild(this.container)
    }

    componentDidUpdate(prevProps) {
        let {didUpdate} = this.props;
        if(didUpdate){
            didUpdate(prevProps);
        }
    }

    render() {
        if(this.container){
            return ReactDOM.createPortal(this.props.children, this.container);
        }else{
            return null;
        }
    }
}