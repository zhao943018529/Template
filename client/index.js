import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import history from './history';
import AppContainer from './container/AppContainer';
import {makeRootReducer} from './reducer/createReducer';
import createStore from './store/createStore';

require('./styles/index.scss');

const store = createStore(makeRootReducer());

store.asyncReducers={};

render(
    <Provider store={store}>
        <AppContainer store={store} history={history}/>
    </Provider>,
    document.getElementById('root')
);