import React from 'react';


class WrapComponent extends React.Component{
    constructor(props){
        super(props);
        let state = props.store.getState();
        let data =props.convertStateToProps(state);
        this.state={
            data:data,
        }
        this.changeStateCallback = ()=>this.changeState();
        this.unsubcribe = props.store.subscribe(this.changeStateCallback);
    }

    changeState(){
        let data = this.props.convertStateToProps(this.props.store.getState());
        this.setState({
            data:data,
        });
    }

    componentWillUnmount(){
        this.unsubcribe(this.changeStateCallback)
    }

    render(){
        let props = this.props;
        let{children,childProps} =props;
        childProps={
            ...childProps,
            ...this.state.data,
            dispatch:props.store.dispatch,
        }
        let child =React.Children.only(children);
        return React.cloneElement(child,childProps);
    }
};




const connect=mapStateToProps=> Component=>{
    return class extends React.Component{

        render(){
            return (
                <WrapComponent {...this.props} convertStateToProps={mapStateToProps}>
                    <Component gg={"test"} />
                </WrapComponent>
            );
        }
    }
}

function createStore(reducer){
    let currentReducer = reducer;
    let keys=Object.keys(currentReducer);
    let state={};
    let listeners=[];
    let isDispatching=false;
    function dispatch(action){
        for(let key of keys){
            state[key]=currentReducer[key](state[key],action);
        }
        emit();
    }
    let store ={
        getState:()=>state,
        dispatch:dispatch,
    };

    function emit(){
        for(let i=0;i<listeners.length;i++){
            listeners[i]();
        }
    }

    store.subscribe=function(fn){
        listeners.push(fn);

        return function unsubcribe(fn){
            for(let i=0; i<listeners.length;++i){
                if(fn===listeners[i]){
                    listeners.splice(i,1);
                }
            }
        };
    }

    store.dispatch({type:'init'});

    return store;
};

export {
    createStore,
    connect,
};