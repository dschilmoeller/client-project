const patientInfo = (state = {
    patientImpacted: '',
    patientIdentifier: '',
    patientAge: '',
    patientSex: '',
    patientWeight: '',
    patientCondition: '',
    patientAdverseConsequences: '',
    patientDescribe: ''
}, action) => {
    if (action.type === 'SET_PATIENT_INFO_1') {
        return {
            ...state,
            patientImpacted: action.payload.patientImpacted,
            patientIdentifier : action.payload.patientIdentifier,
            patientAge: action.payload.patientAge,
            patientSex: action.payload.patientSex,
            patientWeight: action.payload.patientWeight,
            patientCondition: action.payload.patientCondition
        }
    }
    if (action.type === 'SET_PATIENT_INFO_2') {
        return {
            ...state,
            patientIdentifier : action.payload.patientIdentifier,
            patientAge: action.payload.patientAge,
            patientSex: action.payload.patientSex,
            patientWeight: action.payload.patientWeight,
            patientCondition: action.payload.patientCondition
        }
    }
    if (action.type === 'SET_PATIENT_INFO_3') {
        return {
            ...state,
            patientAdverseConsequences: action.payload.patientAdverseConsequences,
            patientDescribe: action.payload.patientDescribe
        }
    }
    if (action.type === 'RETURN_DISPOSABLE_INFO') {
        return state;
    }
    if (action.type === 'CLEAR_ALL_REDUCERS') {
        return {
            patientImpacted: '',
            patientIdentifier: '',
            patientAge: '',
            patientSex: '',
            patientWeight: '',
            patientCondition: '',
            patientAdverseConsequences: '',
            patientDescribe: ''
        }
    }
    return state
}

export default patientInfo;
