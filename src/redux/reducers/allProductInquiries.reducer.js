const allProductInquiries = (state = {}, action) => {
    if (action.type === 'SET_ALL_PRODUCT_INQUIRIES') {
        return action.payload
    }
    return state
}


export default allProductInquiries;