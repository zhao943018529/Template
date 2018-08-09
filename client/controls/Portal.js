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
        if(this.container){
            let {layout}=this.props.children.props;
            if(layout){
                this.container.style.left=layout.left+"px";
                this.container.style.top=layout.height+layout.top+"px";
            }

            return ReactDOM.createPortal(this.props.children, this.container);
        }else{
            return null;
        }
    }
}