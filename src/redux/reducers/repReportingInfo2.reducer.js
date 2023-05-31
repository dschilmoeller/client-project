const repReportingInfo2 = (state = {}, action) => {
    if (action.type === 'SET_REPREPORTING_INFO_2') {
        return action.payload
    }
    if (action.type === 'CLEAR_ALL_REDUCERS') {
        return {}
    }
    return state
}

export default repReportingInfo2;
