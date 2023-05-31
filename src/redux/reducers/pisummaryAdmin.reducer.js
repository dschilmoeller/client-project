const pisummaryAdmin = (state = {}, action) => {
    if (action.type === 'SET_PIFB_SUMMARY_ADMIN') {
        return action.payload;
    }
    return state;
};

export default pisummaryAdmin;
