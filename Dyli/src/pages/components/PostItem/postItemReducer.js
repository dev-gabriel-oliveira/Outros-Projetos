const postItemReducer = (state, action) => {
    switch (action.type) {
        case 'LIKE':
            return {
                isLiked: true,
                isDisliked: false,
            };
        case 'DISLIKE':
            return {
                isLiked: false,
                isDisliked: true,
            };
        case 'UNLIKE':
            return {
                ...state,
                isLiked: false,
            };
        case 'UNDISLIKE':
            return {
                ...state,
                isDisliked: false,
            };
        default:
            return state;
    }
};

export default postItemReducer;