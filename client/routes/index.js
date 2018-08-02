import React from 'react';
import {WrapBundle} from '../utilities/Bundle';


const routes =[
    <WrapBundle key='article' path='/article' load={()=>import('./Article')}/>,
    <WrapBundle key='home' exact={true} path='/' load={()=>import('./Home')}/>,
    
];

// const routes = [{
//         exact: true,
//         path: '/',
//         component: props => <Bundle load={() =>import ('./Home')} {...props}/>,
//     },
//     {
//         path: '/article',
//         component: props=><Bundle load={()=>import ('./Article')} {...props}/>,
//     }
// ];

export default routes;