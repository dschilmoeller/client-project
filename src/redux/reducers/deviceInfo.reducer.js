const deviceInfo = (state = {
    deviceThermoChemInvolved: '',
    deviceModelNumber1: '',
    deviceSerialNumber1: '',
    deviceTempMalfunctionBool: '',
    deviceToBeReturnedBool: '',
    deviceReusedBool: '',
    deviceReplacementUsed: '',
    deviceModelNumber2: '',
    deviceSerialNumber2: ''
}, action) => {
    if (action.type === 'SET_DEVICE_INFO_1') {
        return {
            ...state,
            deviceThermoChemInvolved: action.payload.deviceThermoChemInvolved,
            deviceModelNumber1: action.payload.deviceModelNumber1,
            deviceSerialNumber1: action.payload.deviceSerialNumber1,
            deviceTempMalfunctionBool: action.payload.deviceTempMalfunctionBool,
            deviceToBeReturnedBool: action.payload.deviceToBeReturnedBool,
            deviceReusedBool: action.payload.deviceReusedBool,
        }
    }
    if (action.type === 'SET_DEVICE_INFO_2') {
        return {
            ...state,
            deviceReplacementUsed: action.payload.deviceReplacementUsed,
            deviceModelNumber2: action.payload.deviceModelNumber2,
            deviceSerialNumber2: action.payload.deviceSerialNumber2
        }
    }
    if (action.type === 'GET_DEVICE_INFO') {
        return state;
    }
    if (action.type === 'CLEAR_ALL_REDUCERS') {
        return {
            deviceThermoChemInvolved: '',
            deviceModelNumber1: '',
            deviceSerialNumber1: '',
            deviceTempMalfunctionBool: '',
            deviceToBeReturnedBool: '',
            deviceReusedBool: '',
            deviceReplacementUsed: '',
            deviceModelNumber2: '',
            deviceSerialNumber2: ''
        }
    }
    return state
}

export default deviceInfo;
