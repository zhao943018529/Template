
//0 no login 1 login 2 err
const initialState={
    status:0,
    user:{
        username:'zzzzzz',
        nickname:'python',
    },
    message:'',
};

export {
    initialState as user,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: return state;
    }
}