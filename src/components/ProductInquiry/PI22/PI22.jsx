import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

// continued from PI21 if YES is selected

function ProductInquiry22() {
    const history = useHistory();
    const dispatch = useDispatch();

    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storeDeviceInfo = useSelector(store => store.deviceInfo)

    const [deviceReplacementUsed, setDeviceReplacementUsed] = useState(storeDeviceInfo.deviceReplacementUsed)
    const [deviceModelNumber2, setDeviceModelNumber2] = useState(storeDeviceInfo.deviceModelNumber2)
    const [deviceSerialNumber2, setDeviceSerialNumber2] = useState(storeDeviceInfo.deviceSerialNumber2)

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(56);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const handleNext = () => {
        let combinedDevice2 = {
            deviceReplacementUsed,
            deviceModelNumber2,
            deviceSerialNumber2
        }
        dispatch({ type: 'SET_DEVICE_INFO_2', payload: combinedDevice2 })
        history.push('/productinquiry/26')
    }

    const summarySubmit = () => {
        let combinedDevice2 = {
            deviceReplacementUsed,
            deviceModelNumber2,
            deviceSerialNumber2
        }
        dispatch({ type: 'SET_DEVICE_INFO_2', payload: combinedDevice2 })
        history.push('/productinquiry/summary')
    }

    return (
        <>
            <center>
                <br />
                <div className='pi-header'>
                    <Typography variant='h5'>Device Information</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <progress max="100" min="2" value={progressValue} data-label="Progress..."></progress>
                </div>
                <br />
                <>
                    <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormLabel id="devicereturned-radio">Was a replacement device used?</FormLabel>
                        <RadioGroup
                            aria-labelledby="deviceReplacementUsed-radio"
                            name="radio-buttons-group"
                            row
                            onChange={(e) => setDeviceReplacementUsed(e.target.value)}
                            value={deviceReplacementUsed}
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                            <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                        </RadioGroup>
                    </FormControl>

                    {deviceReplacementUsed === 'Yes' || deviceReplacementUsed === 'Unknown' ? (
                        <>
                            <br />
                            <Typography>Replacement Device Information</Typography>

                            <TextField
                                sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                                id='deviceModelNumber2'
                                label='Model Number:'
                                value={deviceModelNumber2}
                                onChange={(e) => setDeviceModelNumber2(e.target.value)}
                            />

                            <TextField
                                sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                                id='deviceSerialNumber2'
                                label='Serial Number:'
                                value={deviceSerialNumber2}
                                onChange={(e) => setDeviceSerialNumber2(e.target.value)}
                            />
                        </>
                    ) : null}
                </>


            </center>

            <Stack direction='row' justifyContent='space-around'>
                <Button onClick={() => history.push('/productinquiry/21')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
                <Button onClick={() => handleNext()} sx={{ margin: 2 }} variant='contained'>Next</Button>
            </Stack>
            {userReachedSummary ? (<>
                <Stack direction='row' justifyContent='center' sx={{ m: 2 }}>
                    <Button onClick={() => summarySubmit()} sx={{ margin: 2 }} variant='contained'>Return to Summary</Button>
                </Stack>
            </>) : null}
        </>
    )

}

export default ProductInquiry22