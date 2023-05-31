const productFeedback = (state = {
    feedbackHospitalName: '',
    feedbackClinicianName: '',
    feedbackClinicianEmail: '',
    feedbackClinicianPhone: '',
    feedbackComment: ''
}, action) => {
    switch (action.type) {
    case 'RETURN_FEEDBACK':
        return state;
    case 'CAPTURE_FEEDBACK_HOSPITAL_NAME':
        return {
            ...state,
            feedbackHospitalName: action.payload.value,
        };
    case 'CAPTURE_FEEDBACK_CLINICIAN_NAME':
        return {
            ...state,
            feedbackClinicianName: action.payload.value,
        };
    case 'CAPTURE_FEEDBACK_CLINICIAN_EMAIL':
        return {
            ...state,
            feedbackClinicianEmail: action.payload.value,
        };
    case 'CAPTURE_FEEDBACK_CLINICIAN_PHONE':
        return {
            ...state,
            feedbackClinicianPhone: action.payload.value,
        };
    case 'CAPTURE_FEEDBACK_COMMENT':
        return {
            ...state,
            feedbackComment: action.payload.value,
        };
    case 'CLEAR_FEEDBACK_FORM':
        return {
            feedbackHospitalName: '',
            feedbackClinicianName: '',
            feedbackClinicianEmail: '',
            feedbackClinicianPhone: '',
            feedbackComment: ''
        }
    default:
        return state;
    }
};

export default productFeedback;