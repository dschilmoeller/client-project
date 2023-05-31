const componentInfo = (state = {
    componentReusableInvolved: '',
    componentName: '',
    componentProductNumber: ''
}, action) => {
    if (action.type === 'SET_COMPONENT_INFO') {
        return action.payload
    }
    if (action.type === 'CLEAR_ALL_REDUCERS') {
        return {
            componentReusableInvolved: '',
            componentName: '',
            componentProductNumber: ''
        }
    }
    return state
}

export default componentInfo;
