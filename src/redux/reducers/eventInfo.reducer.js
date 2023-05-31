const eventInfo = (state = {
    eventReporterName: '',
    eventTitle: '',
    eventDetails: '',
    eventDate: '',
    eventAllegeCaused: '',
    eventBodyInformed: ''
}, action) => {
    if (action.type === 'SET_EVENT_INFO') {
        return action.payload
    }
    if (action.type === 'CLEAR_ALL_REDUCERS') {
        return {
            eventReporterName: '',
            eventTitle: '',
            eventDetails: '',
            eventDate: '',
            eventAllegeCaused: '',
            eventBodyInformed: ''
        }
    }
    return state
}

export default eventInfo;
