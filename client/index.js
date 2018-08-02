import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import history from './history'

class App extends React.Component{

    render(){
        return (
            <div className="container">
                <Header/>
                <Main/>
            </div>
        );
    }
}



render(
    <Router history={history}>
        <App/>
    </Router>,
    document.getElementById('root')
);