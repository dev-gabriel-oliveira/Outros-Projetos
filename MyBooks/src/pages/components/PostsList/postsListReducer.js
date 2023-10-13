const postsListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.payload,
            };
        default:
            return state;
    }
};

export default postsListReducer;