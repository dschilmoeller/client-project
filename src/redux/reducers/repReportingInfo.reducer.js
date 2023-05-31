const repReportingInfo = (state = {
    repReportingBool: '',
    repName: '',
    repCompanyName: '',
    repContactInfo: '',
    repPresent: '',
    repCommunicatedMethod: '',
    repOtherDescription: '',
    repDateReportedBy: '',
    repDateReportedToTherma: '',
}, action) => {
    if (action.type === 'SET_REPREPORTING_INFO_1') {
        return {
            ...state,
            repReportingBool: action.payload.repReportingBool,
            repName: action.payload.repName,
            repCompanyName: action.payload.repCompanyName,
            repContactInfo: action.payload.repContactInfo,
            repPresent: action.payload.repPresent,
        }
    }
    if (action.type === 'SET_REPREPORTING_INFO_2') {
        return {
            ...state,
            repCommunicatedMethod: action.payload.repCommunicatedMethod,
            repOtherDescription: action.payload.repOtherDescription
        }
    }
    if (action.type === 'SET_REPREPORTING_INFO_3') {
        return {
            ...state,
            repDateReportedBy: action.payload.repDateReportedBy,
            repDateReportedToTherma: action.payload.repDateReportedToTherma
        }
    }
    if (action.type === 'CLEAR_ALL_REDUCERS') {
        return {
            repReportingBool: '',
            repName: '',
            repCompanyName: '',
            repContactInfo: '',
            repPresent: '',
            repCommunicatedMethod: '',
            repOtherDescription: '',
            repDateReportedBy: '',
            repDateReportedToTherma: '',
        }
    }
    return state
}

export default repReportingInfo;
