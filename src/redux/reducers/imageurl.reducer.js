const imageurl = (state = {}, action) => {
    if (action.type === 'SET_IMAGE_URL') {
        return action.payload
    }
    if (action.type === 'CLEAR_ALL_REDUCERS') {
        return {}
    }
    return state
}

export default imageurl;
