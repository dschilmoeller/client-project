import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import { Paper } from '@mui/material';
import MobileHeader from '../MobileHeader/MobileHeader';

function MobilePIWrapper({ component }) {
    const history = useHistory();
    const [paperHeight, setPaperHeight] = useState(725);

    const handlePaperLoad = (event) => {
        const contentHeight = event.target.clientHeight;
        if (contentHeight > paperHeight) {
            setPaperHeight(contentHeight);
        }
    };

    return (
        <>
            <MobileHeader />
            <center>
                <div className='pi-header'>
                    <h2>Product Inquiry</h2>
                </div>
            </center>
            <div className='mainWrapper'>
                <Paper sx={{ minHeight: `${paperHeight}px` }} onLoad={handlePaperLoad}>
                    {component}
                </Paper>
            </div>
        </>
    );
}

export default MobilePIWrapper;