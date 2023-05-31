import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Grid, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function ProductFeedback(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [userSubmitted, setUserSubmitted] = useState(false)

    useEffect(() => {
        dispatch({
            type: 'RETURN_FEEDBACK'
        });
    }, [])
    const productFeedback = useSelector((store) => store.productFeedback);
    // console.log('productFeedback:', productFeedback);

    const feedbackHospitalName = productFeedback.feedbackHospitalName;
    const feedbackClinicianName = productFeedback.feedbackClinicianName;
    const feedbackClinicianEmail = productFeedback.feedbackClinicianEmail;
    const feedbackClinicianPhone = productFeedback.feedbackClinicianPhone;
    const feedbackComment = productFeedback.feedbackComment

    function setFeedbackHospitalName(event) {
        // console.log('event.target.value:', event.target.value);
        dispatch({
            type: 'CAPTURE_FEEDBACK_HOSPITAL_NAME',
            payload: {
                value: event.target.value
            }
        })
    }
    function setFeedbackClinicianName(event) {
        // console.log('event.target.value:', event.target.value);
        dispatch({
            type: 'CAPTURE_FEEDBACK_CLINICIAN_NAME',
            payload: {
                value: event.target.value
            }
        })
    }
    function setFeedbackClinicianEmail(event) {
        // console.log('event.target.value:', event.target.value);
        dispatch({
            type: 'CAPTURE_FEEDBACK_CLINICIAN_EMAIL',
            payload: {
                value: event.target.value
            }
        })
    }
    function setFeedbackClinicianPhone(event) {
        // console.log('event.target.value:', event.target.value);
        dispatch({
            type: 'CAPTURE_FEEDBACK_CLINICIAN_PHONE',
            payload: {
                value: event.target.value
            }
        })
    }
    function setFeedbackComment(event) {
        // console.log('event.target.value:', event.target.value);
        dispatch({
            type: 'CAPTURE_FEEDBACK_COMMENT',
            payload: {
                value: event.target.value
            }
        })
    }

    const feedBackSubmit = () => {
        if (feedbackHospitalName === '') {
            setUserSubmitted(true)
        } else {

            history.push('/feedbacksummary')
        }
    }

    return (
        <>
            <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                alignContent='center'
                padding={2}
            >
                <TextField autoFocus required error={feedbackHospitalName === '' && userSubmitted ? true : false} fullWidth sx={{ backgroundColor: 'white', margin: 1, borderRadius: '4px' }} variant='outlined' type='text' label='Hospital Name' onChange={(e) => setFeedbackHospitalName(e)} defaultValue={feedbackHospitalName} />

                <TextField fullWidth required error={feedbackClinicianName === '' && userSubmitted ? true : false} sx={{ backgroundColor: 'white', margin: 1, borderRadius: '4px' }} variant='outlined' type='text' label='Clinician Name' onChange={(e) => setFeedbackClinicianName(e)} defaultValue={feedbackClinicianName} />

                <TextField fullWidth required error={feedbackClinicianEmail === '' && userSubmitted ? true : false}
                    sx={{
                        backgroundColor: 'white', margin: 2,
                        borderRadius: '4px'
                    }} variant='outlined' type='text' label='Email Address' onChange={(e) => setFeedbackClinicianEmail(e)} defaultValue={feedbackClinicianEmail} />

                <TextField fullWidth required error={feedbackClinicianPhone === '' && userSubmitted ? true : false} sx={{ backgroundColor: 'white', margin: 1, borderRadius: '4px' }} variant='outlined' type='text' label='Phone Number' onChange={(e) => setFeedbackClinicianPhone(e)} defaultValue={feedbackClinicianPhone} />

                <TextField fullWidth required error={feedbackComment === '' && userSubmitted ? true : false} sx={{ backgroundColor: 'white', margin: 1, borderRadius: '4px' }} variant='outlined' multiline minRows={5} type='text' label='Comments' onChange={(e) => setFeedbackComment(e)} defaultValue={feedbackComment} />

                {/* <Typography fullWidth sx={{ margin: 2 }}>Thank you for your feedback!</Typography> */}
            </Grid>
            <Grid
                container
                direction='row'
                columnSpacing='auto'
                justifyContent='space-around'
                alignItems="center"
                alignContent="center"
            >

                <Button onClick={() => history.push('/selectform')} sx={{ marginTop: 2, marginBottom: 2 }} color='secondary' variant='contained'>Back</Button>
                <Button onClick={() => feedBackSubmit()} sx={{ marginTop: 2, marginBottom: 2 }} variant='contained'>Review Feedback</Button>

            </Grid>
        </>
    );
}

export default ProductFeedback;
