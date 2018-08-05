import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import AppContainer from './container/AppContainer';
import {makeRootReducer} from './reducer/createReducer';
import createStore from './store/createStore';

require('./styles/index.scss');

const store = createStore(makeRootReducer());

store.asyncReducers={};

render(
    <Provider store={store}>
        <AppContainer store={store}/>
    </Provider>,
    document.getElementById('root')
);