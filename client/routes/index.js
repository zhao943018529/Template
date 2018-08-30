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

            return <Bundle load={() => import('./TimeLine')} {...props} />;
        },
    },
    {
        path: '/timeline/:type?',
        key: 'timeline',
        render: props => {

            return <Bundle load={() => import('./TimeLine')} {...props} />;
        },
    },
    {
        path: '/editor/:type',
        key: 'editor',
        render: props => {
            let user = store.getState().user;
            if (user.status === 2) {
                return <Bundle load={() => import('./Editor')} {...props} />;
            } else {
                return <Redirect to='/login' />;
            }
        },
    },
    {
        path: '/u/:uname_uid',
        key: 'user',
        render: props => {
            let user = store.getState().user;
            if (user.status === 2) {
                return <Bundle load={() => import('./User')} {...props} store={store} />;
            } else {
                return <Redirect to='/login' />;
            }
        },
    },
    {
        path: '/post/:id',
        key: 'post',
        render: props => {
            let state = store.getState();
            if (!state.comment) {
                let commentRelated = require('../reducer/CommentReducer');
                let resetState = {
                    ...state,
                    comment: commentRelated.comment,
                };
                let newReducer = injectReducers(store, [{ key: 'comment', reducer: commentRelated.default }]);
                store.reset(newReducer, resetState);
            }
            return <Bundle load={() => import('./Article')} {...props} store={store} />;
        },
    },
    {
        path: '/login',
        key: 'login',
        render: props => (<Bundle load={() => import('./Login')} {...props} />),
    }
]);

export default createRoutes;