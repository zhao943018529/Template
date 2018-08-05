const initialState = {
    status:0,
    data:{

    },
    message:'',
};

export {
    initialState as home,
};

export default function reducer(state=initialState,action){
    switch(action.type){
        default:return state;
    }
}