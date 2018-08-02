import React from 'react';
import {Switch,Route} from 'react-router-dom';
import routes from '../routes';

export default class Main extends React.Component{

    render(){
        return (
            <Switch>
                {routes.map(Component=>Component)}
            </Switch>
        );
    }
}


//{routes.map(item=><Route {...item}/>)}