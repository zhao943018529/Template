
//0 not login 1logining 2login 3 err
const initialState = {
    status: 0,
    user: null,
    message: '',
};

const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_START = 'FETCH_USER_START';
const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const fetch_user_success = (data) => ({ type: FETCH_USER_SUCCESS, payload: data });
const fetch_user_start = () => ({ type: FETCH_USER_START });
const fetch_user_error = (err) => ({ type: FETCH_USER_ERROR, error: err.message });

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_START:
            return {
                ...state,
                status: 1,
            };
        case FETCH_USER_SUCCESS:
            let payload = action.payload;
            return {
                status: payload.status === 200 ? 2 : 0,
                user: payload.data,
                message: '',
            };
        case FETCH_USER_ERROR:
            return {
                status: 3,
                user: null,
                message: action.error,
            };
        default: return state;
    }
}

export {
    initialState as user,
    fetch_user_success,
    fetch_user_start,
    fetch_user_error,
};