import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import hospitalInfo from './hospitalInfo.reducer';
import eventInfo from './eventInfo.reducer';
import patientInfo from './patientInfo.reducer';
import deviceInfo from './deviceInfo.reducer';
import componentInfo from './componentInfo.reducer';
import repReportingInfo from './repReportingInfo.reducer';
import productFeedback from './productfeedback.reducer';
import userReachedSummary from './userReachedSummary.reducer';
import piSummaryInfo from './pisummary.reducer';
import deviceData from './deviceData.reducer';
import disposableInfo from './disposableInfo.reducer';
import allProductInquiries from './allProductInquiries.reducer';
import csvUploadStatus from './csvUploadStatus.reducer';
import adminProductFeedback from './adminProductFeedback.reducer';
import imageurl from './imageurl.reducer';
import currentFeedback from './currentFeedback.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
    errors, // contains registrationMessage and loginMessage
    user, // will have an id and username if someone is logged in
    hospitalInfo, // information about the hospital where the event occurred
    eventInfo, // information about the event
    patientInfo, // information about the patient, if impact occurred
    disposableInfo, // information about disposable devices used, if applicable
    deviceInfo, // information about ThermoChem devices involved, if applicable
    componentInfo, // information about reusable devices involved, if applicable
    repReportingInfo, // information about representative reporting event, if applicable
    productFeedback, // clincian product feedback data
    userReachedSummary, // if user reaches summary, set to true to create jump to summary button
    piSummaryInfo,
    deviceData, // device data from the database for prepopulating forms
    csvUploadStatus, //holds status returned by the server to validate logic for CsvUpload
    allProductInquiries, // all product inquiries from database for admin page
    adminProductFeedback, // all feedback data from database for admin page
    imageurl, // image data
    currentFeedback
});

export default rootReducer;
