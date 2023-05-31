import React from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import { Button, Typography, Stack } from '@mui/material';
import { Box } from '@mui/system';

function SelectForm() {
    const history = useHistory();

    return (
        <>
            <Stack textAlign='center' direction='column' spacing={2} justifyContent='space-around'>

                <Box sx={{ padding: '20px' }}>
                    <Typography sx={{ padding: '5px' }}>To report a specific event, click below</Typography>
                    <Button onClick={() => history.push('/productinquiry/1')} variant='contained'>Product Inquiry</Button>
                </Box>
                <Box sx={{ padding: '20px' }}>
                    <Typography>To leave general feedback, click below</Typography>
                    <Button onClick={() => history.push('/feedback')} variant='contained'>Product Feedback</Button>
                </Box>
            </Stack>

        </>
    );
}

export default SelectForm;