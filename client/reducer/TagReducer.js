const initialState = {
    status: 0,
    tags: [],
    message: '',
};

const FETCH_TAGS_START = 'FETCH_TAG_START';
const FETCH_TAGS_SUCCESS = 'FETCH_TAG_SUCCESS';
const FETCH_TAGS_FAILED = 'FETCH_TAG_FAILED';

const fetch_tags_start = () => ({ type: FETCH_TAGS_START });
const fetch_tags_success = data => ({ type: FETCH_TAGS_SUCCESS, payload: data.data, message: data.message });
const fetch_tags_failed = err => ({ type: FETCH_TAGS_FAILED, message: err.message });

export default function TagReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TAGS_START:
            return {
                ...state,
                status: 1,
            };
        case FETCH_TAGS_SUCCESS:
            return {
                status: 2,
                tags: action.payload,
                message: action.message,
            };
        case FETCH_TAGS_FAILED:
            return {
                status: 3,
                tags: [],
                message: action.message,
            };
        default:
            return state;
    }
}

export {
    initialState,
    fetch_tags_start,
    fetch_tags_success,
    fetch_tags_failed,
};