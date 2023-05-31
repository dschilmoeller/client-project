import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './LandingPage.css';
import { useDispatch } from 'react-redux';

// CUSTOM COMPONENTS
import { Button, Typography, Stack, } from '@mui/material';
import { Box } from '@mui/system';



function LandingPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const serialNumber = useParams()

    // TODO: Have this get pre-population data
    useEffect(() => {
        dispatch({
            type: 'GET_DEVICE_DATA',
            payload: serialNumber.serial
        });
    }, [])

    return (
        <>
            <Typography textAlign='center' variant='h5' sx={{ padding: 2 }}>Contact ThermaSolutions</Typography>
            <Stack textAlign='center' direction='column' spacing={2} justifyContent='space-around'>
                <Box sx={{ padding: '20px' }}>
                    <Typography sx={{ padding: '5px' }}>Equipment Inquiries and Feedback</Typography>
                    <Button onClick={() => history.push('/selectform')} variant='contained'>Hospital Staff</Button>
                </Box>
                <Box sx={{ padding: '20px' }}>
                    <Typography>ThermaSolutions Technicians</Typography>
                    <Button onClick={() => history.push('/maintenance')} disabled variant='contained'>Field Engineer</Button>
                </Box>
            </Stack>
        </>
    );
}

export default LandingPage;
