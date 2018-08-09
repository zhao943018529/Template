import React from 'react';
import {getOffset} from '../utilities/Html';


export default class Align extends React.Component{
    constructor(props){
        super(props);
        this.state={
            layout:null,
        }
    }

    componentDidMount(){
        let current = this.props.refObj.current;
        if(current){
            let height = current.offsetHeight;
            let width = current.offsetWidth;
            let layout = getOffset(current);
            layout.width=width;
            layout.height=height;
            this.setState({
                layout:layout,
            });
        }
    }

    render(){
        if(this.state.layout==null){
            return null;
        }else{

            let children = this.props.children;
            let {props}=children;
            let newProps={
                ...props,
                layout:this.state.layout,
            };
            let child = React.Children.only(children,newProps);

            return React.cloneElement(child,newProps);
        }
    }
}