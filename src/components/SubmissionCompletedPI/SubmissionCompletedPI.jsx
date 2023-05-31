import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


// CUSTOM COMPONENTS
import { Button, Typography, Stack } from '@mui/material';
import { Box } from '@mui/system';

function SubmissionCompletedPI() {
    const history = useHistory();

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 200;
        const timer = setTimeout(() => {
            setProgressValue(100);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            history.push('/selectform');
        }, 10000); // 10 seconds

        return () => clearTimeout(redirectTimeout);
    }, [history]);

    return (
        <>
            <Stack textAlign='center' direction='column' spacing={2} justifyContent='space-around'>
                <div style={{ textAlign: 'center' }}>
                    <progress max="100" min="2" value={progressValue} data-label="Progress..."></progress>
                </div>
                <Box sx={{ padding: '20px' }}>
                    <Typography fullWidth sx={{ margin: 2, fontSize: 'h4.fontSize' }}>
                        <b>Your submission has been completed.</b>
                    </Typography>
                    <Typography sx={{ padding: '5px', fontSize: 'h6.fontSize' }}>Thank You For Submiting Your Inquiry.</Typography>
                    <Button onClick={() => history.push('/selectform')} variant='contained'>Home</Button>
                </Box>

            </Stack>

        </>
    );
}

export default SubmissionCompletedPI;