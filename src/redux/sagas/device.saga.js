import axios from 'axios'
import { put, takeEvery, takeLatest } from 'redux-saga/effects'

function * getDeviceData (action) {
    try { 
        const response = yield axios.get(`/api/device/${action.payload}`);
        //put into reducer
        yield put({ type: 'SET_DEVICE_DATA', payload: response.data });
    } catch (err) {
        console.log('error getting device data', err);
    }
}

function* postCsvUpload(action) {
    try {
        const response = yield axios.post('/api/updateDeviceTable', action.payload);
        // yield console.log('postCsvUpload:', response.status)
        yield put({ type: 'SUCCESSFUL_CSV_UPLOAD', payload: response.status });
    } catch (err) {
        console.log('error - cvsUpload:', err);
    }
}

function * deviceSaga () {
    yield takeEvery('GET_DEVICE_DATA', getDeviceData);
    yield takeLatest('POST_CSV_UPLOAD', postCsvUpload);
}

export default deviceSaga;