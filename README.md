# Template
webpack react express template
const initialState = {
    status: 0,
    data: {
        title: 'aaaaaa',
        movies: [{ id: 1, name: 'zzzzz', age: 10, description: 'js is best program language' },
        { id: 2, name: 'wwwww', age: 11, description: 'php is best program language' }
        ]
    },
};

const Thunk =dispatch=>next=>action=>{
    if(typeof action ==='function'){
        action(dispatch);
    }else{
        next(action);
    }
}

function reducer(state=initialState,action){
    switch(action.type){
        case 'H1':
        case 'H2':
        case 'H3':
    }
}

function applyMiddleware(middleWares) {
    return dispatch => action => compose(...middleWares)(dispatch)(action);
}

function createStore(){

    function dispatch(obj){

    }

    return {
        dispatch,
    }
}

function compose(...funcs){
    if(funcs.length===0)return arg=>arg;
    if(funcs.length===1)return funcs[0];
    return funcs.reduce((a,b)=>(...args)=>a(b(...args)));
}

let store = createStore(reducer,applyMiddleware(f1,f2));
