const currentFeedback = (state = {}, action) => {
    if (action.type === 'SET_CURRENT_FEEDBACK') {
        return action.payload
    }
    return state
}


export default currentFeedback;