import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

function * saveProductInquirySummary (action) {
    try {
        // Make post request for new product inquiry
        yield axios.post('/api/productInquiry', action.payload);
    } catch (err) {
        console.log('error setting PI Summary Info', err);
    }
}

function * getProductInquirySummary (action) {
    try {
        // Make get request by id
        const response = yield axios.get(`/api/productInquiry/${action.payload.id}`);
        yield put({ type: 'SET_PI_SUMMARY_INFO', payload: response.data[0]});
    } catch (err) {
        console.log('error getting PI Summary Info', err);
    }
}

function * updateProductInquiry (action) {
    try {
        // Make post request for new product inquiry
        yield axios.put('/api/productInquiry/', action.payload);
        // go get product inquiry data after changes made and update reducer
        yield put({ type: 'GET_PRODUCT_INQUIRY_SUMMARY', payload: action.payload });
    } catch (err) {
        console.log('error getting PI Summary Info', err);
    }
}

function * getAllProductInquiries (action) {
    try {
        const response = yield axios.get('/api/productInquiry/all');
        console.log(response);
        yield put({ type: 'SET_ALL_PRODUCT_INQUIRIES', payload: response.data });
    } catch (err) {
        console.log('error getting PI Summary Info', err);
    }
}

function * updateFormStatus (action) {
    try {
        yield axios.put(`/api/productInquiry/${action.payload.id}`, action.payload);
        // Make get request for product inquiry by id
        const response = yield axios.get(`/api/productInquiry/${action.payload.id}`);
        yield put({ type: 'SET_PI_SUMMARY_INFO', payload: response.data[0]});
    } catch (err) {
        console.log('error updating form status', err);
    }
}
 

function * ProductInquirySaga () {
    yield takeEvery('SAVE_PRODUCT_INQUIRY_SUMMARY', saveProductInquirySummary);
    yield takeEvery('GET_PRODUCT_INQUIRY_SUMMARY', getProductInquirySummary);
    yield takeEvery('UPDATE_PRODUCT_INQUIRY', updateProductInquiry);
    yield takeEvery('GET_ALL_PRODUCT_INQUIRIES', getAllProductInquiries);
    yield takeEvery('UPDATE_FORM_STATUS', updateFormStatus);
}

export default ProductInquirySaga;