const deviceData = (state = [{
    AccountName: '',
    City: '',
    ComponentTray: '',
    ContactInformation: '',
    Country: '',
    CrateAccessories: '',
    CrateAndNotes: '',
    GMGPrimary: '',
    Group: '',
    Hospital: '',
    SerialNumber: '',
    State: '',
    Street: '',
    Zip: '',
}], action) => {
    if (action.type === 'SET_DEVICE_DATA') {
        return action.payload
    }
    if (action.type === 'USER_SET_DEVICE_SERIAL') {
        return [{
            ...state,
            SerialNumber: action.payload.deviceSerialNumber1
        }]
    }
    if (action.type === 'CLEAR_ALL_REDUCERS') {
        return [{
            AccountName: '',
            City: '',
            ComponentTray: '',
            ContactInformation: '',
            Country: '',
            CrateAccessories: '',
            CrateAndNotes: '',
            GMGPrimary: '',
            Group: '',
            Hospital: '',
            SerialNumber: '',
            State: '',
            Street: '',
            Zip: '',
        }]
    }


    return state

}

export default deviceData;
