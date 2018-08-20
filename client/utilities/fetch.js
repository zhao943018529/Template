import 'whatwg-fetch';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let err = new Error(response.statusText);
        err.response = response;
        throw err;
    }
}

function parseJSON(response) {
    return response.json();
}

export function fetchData() {
    let args = [].slice.call(arguments, 0);
    if (args.length < 2) throw new Error("parameters not match");
    let callbacks;
    let option;
    if (Array.isArray(args[1])) {
        callbacks = args[1];
        option = {};
    } else {
        callbacks = args[2];
        option = args[1];
    }
    let i = 0;
    callbacks.length === 3 && callbacks[i++]();
    return fetch(args[0], option).then(checkStatus).then(parseJSON)
        .then(data => callbacks[i++](data))
        .catch(err => callbacks[i](err));
}

export function createRequest() {
    if (arguments.length < 2) {
        throw new Error('parameters size expect gt 2');
    }
    let url = arguments[0], actions;
    let option = arguments[2] && (actions = arguments[2]) ? arguments[1] : (actions = arguments[1]) && {};

    return dispatch => {
        actions.start && dispatch(actions.start());
        return fetch(url, option).then(checkStatus).then(parseJSON)
            .then(data => {
                if (data.status == 200) {
                    dispatch(actions.success(data));
                } else {
                    throw new Error(data.message);
                }
            }).catch(function (err) {
                dispatch(actions.failed(err));
            });
    }
}