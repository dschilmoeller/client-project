import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// all sagas in this file communicate with /api/productfeedback route on server

// WORKER SAGAS: will be fired on based on dispatched action

// CREATE - POST
// Will save reducer data to database
function* submitProductFeedback(action) {
    // updateMyNotes saga updates the notes column in the user table of the db
    try {
        console.log('hello from feedback saga')
        yield axios.post('/api/productFeedback', action.payload);
        console.log('productFeedback POST Saga:', action.payload);
        yield put({ type: 'CLEAR_FEEDBACK_FORM' });
    } catch (error) {
        console.log('client side Product Feedback POST request failed', error);
    }
}

//  READ - GET
//  Will render to Admin Dashboard
function* fetchAllProductFeedback() {
    try {
        const productFeedback = yield axios.get('/api/productFeedback');
        console.log('productFeedback:', productFeedback.data);
        yield put({ type: 'SET_PRODUCT_FEEDBACK', payload: productFeedback.data });
    } catch (error) {
        console.log('failed to GET product feedback', error);
    }
}

function* fetchCurrentProductFeedback(action) {
    // fetchMyNotes saga retrieves the notes saved in the notes column of the user table in the db
    // the notes are then saved to the myNotes reducer
    try {
        const response = yield axios.get(
            `/api/productFeedback/${action.payload.id}`
        );
        console.log('productFeedbackAdmin GET Saga:', response.data);
        yield put({ type: 'SET_CURRENT_FEEDBACK', payload: response.data });
    } catch (error) {
        console.log('client side fetchProductFBadmin GET request failed', error);
    }
}

// Director Saga
// directs work to worker sagas
function* productFeedbackSaga() {
    yield takeLatest('FETCH_PRODUCT_FEEDBACK', fetchAllProductFeedback);
    yield takeLatest('FETCH_CURRENT_PRODUCT_FEEDBACK', fetchCurrentProductFeedback);
    yield takeLatest('SUBMIT_FEEDBACK', submitProductFeedback);
}

export default productFeedbackSaga;
