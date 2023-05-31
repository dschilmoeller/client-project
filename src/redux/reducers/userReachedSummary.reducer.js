const userReachedSummary = (state = false, action) => {
    if (action.type === 'SET_USER_REACHED_SUMMARY') {
        return action.payload
    }
    if (action.type === 'CLEAR_ALL_REDUCERS') {
        return false
    }
    return state
}

export default userReachedSummary;
