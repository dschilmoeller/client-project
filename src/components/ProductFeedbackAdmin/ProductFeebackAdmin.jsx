import AdminNav from '../AdminNav/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, Stack, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductcurrentFeedback() {
    const dispatch = useDispatch();
    const { id: feedbackId } = useParams();
    const currentFeedback = useSelector((store) => store.currentFeedback[0]);
    console.log('currentFeedback:', currentFeedback);

    // on page load grab id from url and fetch details
    useEffect(() => {
        dispatch({
            type: 'FETCH_CURRENT_PRODUCT_FEEDBACK',
            payload: { id: feedbackId },
        });
    }, []);

    return (
        <>
            <AdminNav />
            <Typography variant="h3" textAlign="center" m="40px">Feedback</Typography>
            <Stack direction="row" justifyContent="center">
                {currentFeedback && currentFeedback.hospital_name && (
                    <Paper sx={{ padding: '1rem', marginBottom: '1rem', width:'60%' }} elevation={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                              Hospital Name:
                                </Typography>
                                <Typography variant="h6">{currentFeedback.hospital_name}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                              Clinician Name:
                                </Typography>
                                <Typography variant="h6">{currentFeedback.clinician_name}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                              Clinician Email:
                                </Typography>
                                <Typography variant="h6">{currentFeedback.clinician_email}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                              Clinician Phone:
                                </Typography>
                                <Typography variant="h6">{currentFeedback.clinician_phone}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }} mb="10px">
                              Comment:
                                </Typography>
                                <Box sx={{ border: '1px solid gray', borderRadius: '5px', padding: '8px', minHeight: '100px' }}>
                                    <Typography variant="h6">{currentFeedback.comment}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
            </Stack>
        </>
    )

}

export default ProductcurrentFeedback;