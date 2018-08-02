import React from 'react';
import {Switch} from 'react-router-dom';
import routes from '../routes';

export default class Main extends React.Component{

    render(){
        return (
            <Switch>
                {routes}
            </Switch>
        );
    }
}


