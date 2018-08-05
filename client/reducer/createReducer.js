import { combineReducers } from "redux";
import UserReducer from './UserReducer';

function makeRootReducer(asyncReducers) {

    return combineReducers({
        user: UserReducer,
        ...asyncReducers,
    });
}

export {makeRootReducer};

export default function injectReducers(store, reducers) {
    let asyncReducers = store.asyncReducers || {};
    for (let v of reducers) {
        asyncReducers[v.key] = v.reducer;
    }

    store.asyncReducers = asyncReducers;

    return makeRootReducer(asyncReducers);
}