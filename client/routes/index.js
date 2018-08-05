import React from 'react';
import Bundle from '../utilities/Bundle';
import injectReducers from '../reducer/createReducer';

// const routes =[
//     <WrapBundle key='article' path='/article' load={()=>import('./Article')}/>,
//     <WrapBundle key='home' exact={true} path='/' load={()=>import('./Home')}/>,
    
// ];

const createRoutes =store=> ([{
        exact: true,
        path: '/',
        key:'home',
        render: props => {
            let state = store.getState();
            let homeRelated = require('../reducer/HomeReducer');
            let resetState = {
                ...state,
                home: homeRelated.home,
            };
            let newReducer = injectReducers(store, [{
                key: 'home',
                reducer: homeRelated.default
            }]);
            store.reset(newReducer, resetState);

            return <Bundle load={() =>import ('./Home')} {...props}/>;
        },
    },
    {
        path: '/channel/:category',
        key:'channel',
        render: props=>{
            let state = store.getState();
            let userRelated = require('../reducer/UserReducer');
            let resetState = {
                ...state,
                user: userRelated.user,
            };
            let newReducer = injectReducers(store, [{
                key: 'user',
                reducer: userRelated.default
            }]);
            store.reset(newReducer, resetState);

            return <Bundle load={()=>import ('./ListView')} {...props}/>;
        },
    }
]);

export default createRoutes;