const initialState = {
    status: 0,
    articles: [],
    message: '',
};

export {
    initialState as article,
};


const FETCH_ARTICLES_SUCCESS = 'fetch_articles_success';
const FETCH_ARTICLES_FAILED = 'fetch_articles_failed';
const FETCH_ARTICLES_START = 'fetch_articles_start';

const fetch_articles_start = () => ({ type: FETCH_ARTICLES_START });
const fetch_articles_success = result => ({ type: FETCH_ARTICLES_SUCCESS, payload: result.data, message: result.message });
const fetch_articles_failed = err => ({ type: FETCH_ARTICLES_FAILED, error: err });

export {
    fetch_articles_start,
    fetch_articles_success,
    fetch_articles_failed,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ARTICLES_START:
            return {
                ...state,
                articles: [],
                statue: 1,
            };
        case FETCH_ARTICLES_SUCCESS:
            return {
                ...state,
                status: 2,
                articles: action.payload,
                message: action.message
            };
        case FETCH_ARTICLES_FAILED:
            return {
                ...state,
                status: 3,
                message: action.error.message,
            };
        default:
            return state;
    }
}