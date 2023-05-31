const adminProductFeedback = (state = {}, action) => {
    if (action.type === 'SET_PRODUCT_FEEDBACK') {
        return action.payload
    }
    return state
};

export default adminProductFeedback;