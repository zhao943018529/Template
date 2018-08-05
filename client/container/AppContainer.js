import React from 'react';
import {Router,Switch,Route} from 'react-router-dom';
import createRoutes from '../routes';
import history from '../history';
import Header from '../components/Header';

export default class AppContainer extends React.Component{

    render(){
        let routes = createRoutes(this.props.store);

        return (
            <Router history={history}>
                <div className="app-container">
                    <Header history={history}/>
                    <div className="content">
                        <Switch>
                        {routes.map(route=>{
                            return <Route {...route}/>
                        })}
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}