// TODO: adapt productFeedback so this changes on each letter typed rather than when hitting next. 
// P16 & P17

const disposableInfo = (state = {
    disposableSterileKitInvolved: '',
    disposableProductName1: '',
    disposableProductNumber1: '',
    disposableLotNumber1: '',
    disposableExpirationDate1: '',
    disposableReplacementUsed: '',
    disposableProductName2: '',
    disposableProductNumber2: '',
    disposableLotNumber2: '',
    disposableExpirationDate2: ''
}, action) => {
    if (action.type === 'SET_DISPOSABLE_INFO_1') {
        return {
            ...state,
            disposableSterileKitInvolved : action.payload.disposableSterileKitInvolved,
            disposableProductName1 : action.payload.disposableProductName1,
            disposableProductNumber1 : action.payload.disposableProductNumber1,
            disposableLotNumber1 : action.payload.disposableLotNumber1,
            disposableExpirationDate1: action.payload.disposableExpirationDate1
        }
    }
    if (action.type === 'SET_DISPOSABLE_INFO_2') {
        return {
            ...state,
            disposableReplacementUsed: action.payload.disposableReplacementUsed,
            disposableProductName2: action.payload.disposableProductName2,
            disposableProductNumber2: action.payload.disposableProductNumber2,
            disposableLotNumber2: action.payload.disposableLotNumber2,
            disposableExpirationDate2: action.payload.disposableExpirationDate2,
        }
    }
    if (action.type === 'RETURN_DISPOSABLE_INFO') {
        return state
    }
    if (action.type === 'CLEAR_ALL_REDUCERS') {
        return {
            disposableSterileKitInvolved: '',
            disposableProductName1: '',
            disposableProductNumber1: '',
            disposableLotNumber1: '',
            disposableExpirationDate1: '',
            disposableReplacementUsed: '',
            disposableProductName2: '',
            disposableProductNumber2: '',
            disposableLotNumber2: '',
            disposableExpirationDate2: ''
        }
    }
    return state
}

export default disposableInfo;