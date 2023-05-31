import React from 'react';

// CUSTOM COMPONENTS
import { Paper } from '@mui/material';
import MobileHeader from '../MobileHeader/MobileHeader';


function MobileWrapper({ component }) {

    return (
        <div>
            <MobileHeader />
            <div className='mainWrapper'>
                <Paper sx={{ height: '700px', marginTop: '40px' }}>
                    {component}
                </Paper>
            </div>
        </div>
    );
}

export default MobileWrapper;