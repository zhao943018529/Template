//status:0 nothing 1 success 2 error

const initialState = {
    status: 0,
    message: '',
};

const RESET_STATUS = 'RESET_STATUS';
const SUCCESS_STATUS = 'SUCCESS_SATUS';
const FAILED_STATUS = 'FAILED_STATUS';

const reset_status = () => ({ type: RESET_STATUS, message: '' });
const success_status = data => ({ type: SUCCESS_STATUS, message: data.message });
const failed_status = err => ({ type: FAILED_STATUS, message: err.message });

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case RESET_STATUS:
            return {
                status: 0,
                message: '',
            };
        case SUCCESS_STATUS:
            return {
                status: 1,
                message: action.message,
            };
        case FAILED_STATUS:
            return {
                status: 2,
                message: action.message,
            };
        default:
            return state;
    }
}

export {
    reset_status,
    success_status,
    failed_status,
};