import React from 'react';
import { Redirect } from 'react-router-dom';
import Bundle from '../utilities/Bundle';
import injectReducers from '../reducer/createReducer';

// const routes =[
//     <WrapBundle key='article' path='/article' load={()=>import('./Article')}/>,
//     <WrapBundle key='home' exact={true} path='/' load={()=>import('./Home')}/>,

// ];

const createRoutes = store => ([
    {
        exact: true,
        path: '/',
        key: 'home',
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

            return <Bundle load={() => import('./Home')} {...props} />;
        },
    },
    {
        path: '/channel/:category',
        key: 'channel',
        render: props => {
            let resetState = store.getState();
            let userRelated = require('../reducer/UserReducer');
            let newReducer = injectReducers(store, [{
                key: 'user',
                reducer: userRelated.default
            }]);
            store.reset(newReducer, resetState);

            return <Bundle load={() => import('./ListView')} {...props} />;
        },
    },
    {
        path: '/u/:uname_uid',
        key: 'user',
        render: props => {
            let user = store.getState().user;
            if (user.status === 2) {
                return <Bundle load={() => import('./User/components/UserView')} {...props} user={user.user} store={store} />;
            } else {
                return <Redirect to='/login' />;
            }
        },
    },
    {
        path: '/login',
        key: 'login',
        render: props => (<Bundle load={() => import('./Login')} {...props} />),
    },
    {
        path: '/login',
        key: 'login',
        render: props => (<Bundle load={() => import('./Login')} {...props} />),
    }
]);

export default createRoutes;