const hospitalInfo = (state = {
    hospitalName: '',
    hospitalClinicianName: '',
    hospitalAddress: '',
    hospitalCountry: '',
    hospitalTraining: ''
}, action) => {
    if (action.type === 'SET_HOSPITAL_INFO') {
        return action.payload
    }
    if (action.type === 'CLEAR_ALL_REDUCERS') {
        return {
            hospitalName: '',
            hospitalClinicianName: '',
            hospitalAddress: '',
            hospitalCountry: '',
            hospitalTraining: ''
        }
    }
    return state
}

export default hospitalInfo;
