import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Typography, Grid, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ProductFeedbackSummary(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const productFeedback = useSelector((store) => store.productFeedback);
    console.log('productFeedback:', productFeedback);

    const feedbackHospitalName = productFeedback.feedbackHospitalName;
    const feedbackClinicianName = productFeedback.feedbackClinicianName;
    const feedbackClinicianEmail = productFeedback.feedbackClinicianEmail;
    const feedbackClinicianPhone = productFeedback.feedbackClinicianPhone;
    const feedbackComment = productFeedback.feedbackComment


    function submitProductFeedback() {
        //  how to do modal
        // history.push('/home')
        dispatch({
            type: 'SUBMIT_FEEDBACK',
            payload: productFeedback
        })
        history.push('/submissioncompleted')
    }

    return (
        <>
            <Grid
                container
                direction='column'
                justify='center'
                alignItems='left'
                alignContent='center'
                padding={2}
            >
                <Typography fullWidth alignSelf='flex-start' sx={{ fontSize: 'x-large' }} >Feedback Summary:</Typography>
                <Typography
                    fullWidth
                    alignSelf='flex-start'
                    sx={{ margin: 1, fontSize: 'large' }}
                >Hospital Name:
                </Typography>
                <Typography
                    fullWidth
                    sx={{ marginBottom: 1, marginLeft: 1, fontSize: 'large' }}
                ><b>{feedbackHospitalName}</b>
                </Typography>
                <Typography
                    fullWidth
                    alignSelf='flex-start'
                    sx={{ margin: 1, marginLeft: 1, fontSize: 'large' }}
                >Clinician Name:</Typography>
                <Typography
                    fullWidth
                    sx={{ marginBottom: 1, marginLeft: 1, fontSize: 'large' }}
                ><b>{feedbackClinicianName}</b></Typography>
                <Typography
                    fullWidth
                    alignSelf='flex-start'
                    sx={{ margin: 1, marginLeft: 1, fontSize: 'large' }}
                >Clinician Email:</Typography>
                <Typography
                    fullWidth
                    sx={{ marginBottom: 1, marginLeft: 1, fontSize: 'large' }}
                ><b>{feedbackClinicianEmail}</b></Typography>
                <Typography
                    fullWidth
                    alignSelf='flex-start'
                    sx={{ margin: 1, marginLeft: 1, fontSize: 'large' }}
                >Clinician Phone:</Typography>
                <Typography
                    fullWidth
                    sx={{ margin: 1, marginLeft: 1, fontSize: 'large' }}
                ><b>{feedbackClinicianPhone} </b></Typography>
                <Typography
                    fullWidth
                    alignSelf='flex-start'
                    sx={{ margin: 1, marginLeft: 1, fontSize: 'large' }}
                >Comment: </Typography>
                <Typography
                    fullWidth
                    sx={{ marginBottom: 1, marginLeft: 1, fontSize: 'large' }}
                ><b>{feedbackComment}</b>
                </Typography>

                <Typography fullWidth sx={{ margin: 2, }}>
                    <i>Thank you for your feedback!</i>
                </Typography>

            </Grid>
            <Grid
                container
                direction='row'
                columnSpacing='auto'
                justifyContent='space-around'
                alignItems="center"
                alignContent="center"
            >
                <Button
                    onClick={() => history.push('/feedback')}
                    sx={{ margin: 2 }}
                    color='secondary'
                    variant='contained'
                >
                    Edit
                </Button>
                <Button
                    onClick={submitProductFeedback}
                    sx={{ margin: 2 }}
                    variant='contained'
                >
                    Submit Feedback
                </Button>
            </Grid>
        </>
    );
}

export default ProductFeedbackSummary;
