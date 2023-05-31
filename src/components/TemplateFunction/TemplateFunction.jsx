import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';


function TemplateFunction(props) {

    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Functional Component');

    return (
        <div className='mainWrapper'>
            <Paper sx={{ height: '680px' }}>

            </Paper>
            <TextField autoFocus variant='outlined' type='text' label='Label' required sx={{ width: '80%' }} helperText='helper text' onChange={(e) => console.log('e.target.value:', e.target.value)} />
        </div>
    );
}

export default TemplateFunction;
