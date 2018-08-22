import { combineReducers } from "redux";
import UserReducer from './UserReducer';
import TagReducer from './TagReducer';
import MessageReducer from './MessageReducer';

function makeRootReducer(asyncReducers) {

    return combineReducers({
        tag: TagReducer,
        user: UserReducer,
        msg: MessageReducer,
        ...asyncReducers,
    });
}

export { makeRootReducer };

export default function injectReducers(store, reducers) {
    let asyncReducers = store.asyncReducers || {};
    for (let v of reducers) {
        asyncReducers[v.key] = v.reducer;
    }

    store.asyncReducers = asyncReducers;

    return makeRootReducer(asyncReducers);
}