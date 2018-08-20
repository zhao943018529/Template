import React from 'react';
import Bundle from '../../../utilities/Bundle';
import injectReducers from '../../../reducer/createReducer';

const routes = [
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
        render: props => (<Bundle load={() => import('./Tag')} {...props} />),
    }
];

export default routes;