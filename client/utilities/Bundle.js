import React from 'react';
import {Route} from 'react-router-dom'; 

export default class Bundle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Component: null
        };
        props.load().then(component => this.setState({
            Component: component.default
        }));
    }

    render(){
        let {
            load,
            ...props
        } = this.props;
        let Component = this.state.Component;

        return Component?<Component {...props}/>:null;
    }
}


const WrapBundle=({load ,...rest})=>(
    <Route {...rest} render={props=><Bundle load={load} {...props}/>}/>
);

export {WrapBundle};