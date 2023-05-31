import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MobileHeader = () => {

    const history = useHistory();

    const clickHandle = () => {
        history.push('/selectform')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: '#cc053c' }} elevation={2}>
                <Toolbar>
                    <center>
                        <img src="./images/ThermaSolutions-Logo-300.jpg" onClick={clickHandle} width="50%" />
                    </center>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MobileHeader;
