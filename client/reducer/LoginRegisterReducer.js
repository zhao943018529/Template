//status:0 close 1 login open 2 register open

const initialState = {
    status: 0,
};

const LOGIN_OPEN = 'login_open';
const MODAL_CLOSE = 'login_close';
const REGISTER_OPEN = 'register_open';
const login_open = () => ({ type: LOGIN_OPEN });
const modal_close = () => ({ type: MODAL_CLOSE });
const register_open = () => ({ type: REGISTER_OPEN });

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_OPEN:
            return {
                status: 1,
            };
        case MODAL_CLOSE:
            return {
                status: 0,
            };
        case REGISTER_OPEN:
            return {
                status: 2,
            };
        default:
            return state;
    }
}

export {
    login_open,
    modal_close,
    register_open,
};