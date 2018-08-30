const initialState = {
    status: 0,
    comments: [],
    message: '',
};

export {
    initialState as comment,
};


const FETCH_COMMENTS_SUCCESS = 'fetch_comments_success';
const FETCH_COMMENTS_FAILED = 'fetch_comments_failed';
const FETCH_COMMENTS_START = 'fetch_comments_start';

const fetch_comments_start = () => ({ type: FETCH_COMMENTS_START });
const fetch_comments_success = result => ({ type: FETCH_COMMENTS_SUCCESS, payload: result.data, message: result.message });
const fetch_comments_failed = err => ({ type: FETCH_COMMENTS_FAILED, error: err });

export {
    fetch_comments_start,
    fetch_comments_success,
    fetch_comments_failed,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMENTS_START:
            return {
                ...state,
                comments: [],
                statue: 1,
            };
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                status: 2,
                comments: action.payload,
                message: action.message
            };
        case FETCH_COMMENTS_FAILED:
            return {
                ...state,
                status: 3,
                message: action.error.message,
            };
        default:
            return state;
    }
}