import { combineReducers } from "redux";
import UserReducer from './UserReducer';
import TagReducer from './TagReducer';
import MessageReducer from './MessageReducer';
import ArticleReducer from './ArticleReducer';
import LoginRegisterReducer from './LoginRegisterReducer';

function makeRootReducer(asyncReducers) {

    return combineReducers({
        tag: TagReducer,
        user: UserReducer,
        article: ArticleReducer,
        msg: MessageReducer,
        login: LoginRegisterReducer,
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