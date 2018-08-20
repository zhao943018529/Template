import React from 'react';
import Bundle from '../../../utilities/Bundle';
import injectReducers from '../../../reducer/createReducer';

const createRoutes =store=>(
    [
        {
            exact: true,
            path: '/',
            key: 'index',
            render: props => {
                return <Bundle load={() => import('./IndexUser')} {...props} />;
            },
        },
        {
            path: '/tag',
            key: 'tag',
            render: props => {
                let resetState = store.getState();
                let tagRelated = require('../../../reducer/TagReducer');
                if(!resetState.tag){
                    resetState.tag=tagRelated.initialState;
                }
                let newReducer = injectReducers(store, [{
                    key: 'tag',
                    reducer: tagRelated.default
                }]);
                store.reset(newReducer, resetState);
                return (<Bundle load={() => import('./Tag')} {...props} />);
            },
        }
    ]
);

export default createRoutes;