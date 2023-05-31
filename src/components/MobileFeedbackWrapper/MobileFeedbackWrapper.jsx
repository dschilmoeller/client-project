import React from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import { Paper } from '@mui/material';
import MobileHeader from '../MobileHeader/MobileHeader';

function MobileFeedbackWrapper({ component }) {

    return (
        <>
            <MobileHeader />
            <center>
                <div className='pi-header'>
                    <h2>Product Feedback</h2>
                </div>
            </center>
            <div className='mainWrapper'>
                <Paper sx={{ height: '100%' }}>
                    {component}
                </Paper>
            </div>
        </>
    );
}

export default MobileFeedbackWrapper;