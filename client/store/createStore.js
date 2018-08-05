import  {createStore,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {makeRootReducer} from '../reducer/createReducer';


const RESETNAME='@RESET';

const resetReducerCreator = (reducer,resetState)=>(state,action)=>{
    if(action.type===RESETNAME){
        return resetState;
    }else{
        return reducer(state,action);
    }
}

const restEnhancer = createStore=>(...args)=>{  
    const store = createStore(...args);

    const reset = (preState,reducer)=>{
        const newReducer = resetReducerCreator(preState,reducer);
        store.replaceReducer(newReducer);
        store.dispatch({
            type:RESETNAME,
        });
    }


    return {
        ...store,
        reset,
    };
}

export default (reducer)=>{
    const finalCreateStore = compose(restEnhancer,applyMiddleware(thunk))(createStore);
    return finalCreateStore(reducer);
}