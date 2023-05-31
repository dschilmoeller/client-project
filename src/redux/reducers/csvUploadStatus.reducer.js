const csvUploadStatus = (state = null, action) => {
    switch (action.type) {
    case 'SUCCESSFUL_CSV_UPLOAD':
        return action.payload;
    case 'RESET_CSV_UPLOAD':
        return null;
    default:
        return state;
    }
}

export default csvUploadStatus;