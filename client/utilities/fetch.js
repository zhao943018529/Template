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

function fetchData() {
    if (arguments.length === 0) throw new Error("parameters not match");
    let args = [].slice.call(arguments, 0);
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
        .then(data => {
            if(data.status==200){
                callbacks[i++](data.data);
            }else{
                throw new Error(data.message);
            }
        }).catch(err => callbacks[i](err));
}

export default fetchData;