import React from 'react';
import {findDOMNode} from 'react-dom';
import Portal from './Portal';

//type:Error Success 

export default class LightTip extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true,
        };
        this.timeId=null;
        this.getContainer = this._getContainer.bind(this);
        this.delayDestroyTip = this._delayDestroyTip.bind(this);
    }

    componentDidMount(){
        let child = findDOMNode(this);
        let parent = child.offsetParent;
        parent.style.marginLeft=parent.offsetWidth/2+'px';
        this.timeId=setTimeout(this.delayDestroyTip,1500);
    }

    componentWillUnmount(){
        this.clearDelayTime();
    }

    clearDelayTime(){
        if(this.timeId){
            clearTimeout(this.timeId);
        }
    }

    _delayDestroyTip(){
        this.clearDelayTime();
        this.setState({
            show:false,
        });
    }

    _getContainer(){
        let container = document.createElement("div");
        container.className=`lighttip ${this.props.type==='success'?'lighttip-success':'lighttip-error'}`;
        document.body.appendChild(container);
        return container;
    }

    render(){
        if(this.state.show){
            return (
                <Portal getContainer={this.getContainer}>
                    <i className="lighttip-icon fa fa-check" aria-hidden="true"></i>
                    <span className="lighttip-content">{this.props.message}</span>
                </Portal>
            );
        }else{
            return null;
        }
    }
}