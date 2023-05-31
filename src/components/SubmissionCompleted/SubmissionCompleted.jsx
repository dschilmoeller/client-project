import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


// CUSTOM COMPONENTS
import { Button, Typography, Stack } from '@mui/material';
import { Box } from '@mui/system';

function SubmissionCompleted() {
    const history = useHistory();

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            history.push('/selectform');
        }, 10000); // 10 seconds

        return () => clearTimeout(redirectTimeout);
    }, [history]);

    return (
        <>
            <Stack textAlign='center' direction='column' spacing={2} justifyContent='space-around'>

                <Box sx={{ padding: '20px' }}>
                    <Typography fullWidth sx={{ margin: 2, fontSize: 'h4.fontSize'}}>
                        <b>Submission Completed.</b>
                    </Typography>
                    <Typography sx={{ padding: '5px', fontSize: 'h6.fontSize' }}>Thank You For Your Feedback!</Typography>
                    <Button onClick={() => history.push('/selectform')} variant='contained'>Home</Button>
                </Box>

            </Stack>

        </>
    );
}

export default SubmissionCompleted;