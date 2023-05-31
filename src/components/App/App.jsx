import React, { useEffect } from 'react';
import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
// import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import SelectForm from '../SelectForm/SelectForm';

// Form Pages
import ProductInquiry1 from '../ProductInquiry/PI1/PI1';
import ProductInquiry6 from '../ProductInquiry/PI6/PI6';
import ProductInquiry10 from '../ProductInquiry/PI10/PI10.jsx';
import ProductInquiry12 from '../ProductInquiry/PI12/PI12';
// import ProductInquiry2 from '../ProductInquiry/PI2/PI2';

import ProductInquiry_A1 from '../ProductInquiry/PI_Admin/PI_A1';

import ProductInquiry16 from '../ProductInquiry/PI16/PI16';
import ProductInquiry17 from '../ProductInquiry/PI17/PI17';
import ProductInquiry21 from '../ProductInquiry/PI21/PI21';
import ProductInquiry22 from '../ProductInquiry/PI22/PI22';
import ProductInquiry26 from '../ProductInquiry/PI26/PI26';
import ProductInquiry31 from '../ProductInquiry/PI31/PI31';
import ProductInquiry32 from '../ProductInquiry/PI32/PI32';
import ProductInquiry33 from '../ProductInquiry/PI33/PI33';
import PI_Summary from '../ProductInquiry/PI_Summary/PI_Summary';

import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MobileWrapper from '../MobileWrapper/MobileWrapper';
import MobileFeedbackWrapper from '../MobileFeedbackWrapper/MobileFeedbackWrapper';
import ProductFeedback from '../ProductFeedback/ProductFeedback';
import ProductFeedbackSummary from '../ProductFeedbackSummary/ProductFeedbackSummary';
import AdminLoginPage from '../AdminLoginPage/AdminLoginPage';
import AdminPage from '../AdminPage/AdminPage';
import AdminProtectedRoute from '../AdminProtectedRoute/AdminProtectedRoute';
import MobilePIWrapper from '../MobilePIWrapper/MobilePIWrapper';
import ImageUpload from '../ImageUpload/ImageUpload';
import SubmissionCompleted from '../SubmissionCompleted/SubmissionCompleted';
import SubmissionCompletedPI from '../SubmissionCompletedPI/SubmissionCompletedPI';
import ProductFeedbackAdmin from '../ProductFeedbackAdmin/ProductFeebackAdmin';

function App() {
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_USER' });
    }, [dispatch]);

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#AC0B38',
            },
            secondary: {
                main: '#e66c6c',
            },
            text: {
                primary: '#777',
                // secondary: "#"
            },
            background: {
                paper: '#d9d9d9',
            },
            typography: {
                fontFamily: 'EB Garamond',
            },
        },
    });

    const piImageNextString = '/productinquiry/summary'
    const piImageBackString = '/productinquiry/31'

    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Router>
                <div>
                    <Switch>
                        {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                        <Redirect exact from="/" to="/home/0" />

                        {/* <Route exact path="/about">
                            <AboutPage />
                        </Route> */}

                        <Route exact path="/home/:serial">
                            {user.access_level === 1 ?
                                <Redirect to="/admin" />
                                :
                                <MobileWrapper component={<LandingPage />} />
                            }
                        </Route>
                        <Route exact path="/selectform">
                            <MobileWrapper component={<SelectForm />} />
                        </Route>
                        <Route exact path="/feedback">
                            <MobileFeedbackWrapper component={<ProductFeedback />} />
                        </Route>
                        <Route exact path="/feedbacksummary">
                            <MobileFeedbackWrapper component={<ProductFeedbackSummary />} />
                        </Route>
                        <Route exact path="/submissioncompleted">
                            <MobileFeedbackWrapper component={<SubmissionCompleted />} />
                        </Route>

                        {/* Product Inquiry Forms */}
                        <Route
                            exact
                            path="/productinquiry/1"
                        >
                            <MobilePIWrapper component={<ProductInquiry1 />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/6"
                        >
                            <MobilePIWrapper component={<ProductInquiry6 />} />
                        </Route>

                        <Route
                            path="/productinquiry/10"
                        >
                            <MobilePIWrapper component={<ProductInquiry10 />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/12"
                        >
                            <MobilePIWrapper component={<ProductInquiry12 />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/16"
                        >
                            <MobilePIWrapper component={<ProductInquiry16 />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/17"
                        >
                            <MobilePIWrapper component={<ProductInquiry17 />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/21"
                        >
                            <MobilePIWrapper component={<ProductInquiry21 />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/22"
                        >
                            <MobilePIWrapper component={<ProductInquiry22 />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/26"
                        >
                            <MobilePIWrapper component={<ProductInquiry26 />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/31"
                        >
                            <MobilePIWrapper component={<ProductInquiry31 />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/32"
                        >
                            <MobilePIWrapper component={<ProductInquiry32 />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/33"
                        >
                            <MobilePIWrapper component={<ProductInquiry33 />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/addImage"
                        >
                            <MobilePIWrapper component={<ImageUpload nextString={piImageNextString} backString={piImageBackString} />} />
                        </Route>

                        <Route
                            exact
                            path="/productinquiry/summary"
                        >
                            <MobilePIWrapper component={<PI_Summary />} />
                        </Route>

                        <Route
                            exact
                            path="/submissioncompletedPI"
                        >
                            <MobilePIWrapper component={<SubmissionCompletedPI />} />
                        </Route>


                        {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
                        <ProtectedRoute exact path="/user">
                            {/* <UserPage /> */}
                        </ProtectedRoute>

                        {/* <ProtectedRoute exact path="/info">
                            <InfoPage />
                        </ProtectedRoute> */}

                        <Route exact path="/adminLogin">
                            {user.access_level === 1 ? <Redirect to="/admin" /> : <AdminLoginPage />}
                        </Route>


                        <AdminProtectedRoute
                            // logged in shows admin else shows LoginPage
                            exact
                            path="/admin"
                        >
                            {user.access_level === 1 ? <AdminPage /> : <AdminLoginPage />}
                        </AdminProtectedRoute>

                        <AdminProtectedRoute exact path="/details/:id">
                            <ProductInquiry_A1 />
                        </AdminProtectedRoute>

                        <AdminProtectedRoute exact path="/feedback/:id">
                            <ProductFeedbackAdmin />
                        </AdminProtectedRoute>

                        <Route exact path="/login">
                            {user.id ? (
                                // If the user is already logged in,
                                // redirect to the /user page
                                <Redirect to="/user" />
                            ) : (
                                // Otherwise, show the login page
                                <LoginPage />
                            )}
                        </Route> 

                        {/* <Route ea */}

                        <Route exact path="/home/:serial">
                            {user.id ? (
                                // If the user is already logged in,
                                // redirect them to the /user page
                                <Redirect to="/user" />
                            ) : (
                                // Otherwise, show the Landing page
                                <MobileWrapper component={<LandingPage />} />
                            )}
                        </Route>


                        {/* If none of the other routes matched, we will show a 404. */}
                        <Route>
                            <h1>404</h1>
                        </Route>
                    </Switch >
                    {/* <Footer /> */}
                </div >
            </Router >
        </ThemeProvider >
    );
}

export default App;
