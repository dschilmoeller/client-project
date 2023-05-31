import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

// start of Device Information
// continues on PI22 / jumps to PI26 if NO is selected.


function ProductInquiry21() {
    const history = useHistory();
    const dispatch = useDispatch();

    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storeDeviceInfo = useSelector(store => store.deviceInfo)
    const storeDeviceData = useSelector(store => store.deviceData)
    
    const [userSubmitted, setUserSubmitted] = useState(false)
    const [deviceThermoChemInvolved, setDeviceThermoChemInvolved] = useState(storeDeviceInfo.deviceThermoChemInvolved)
    const [deviceModelNumber1, setDeviceModelNumber1] = useState(storeDeviceInfo.deviceModelNumber1)
    const [deviceSerialNumber1, setDeviceSerialNumber1] = useState(storeDeviceData[0].SerialNumber)
    const [deviceTempMalfunctionBool, setDeviceTempMalfunctionBool] = useState(storeDeviceInfo.deviceTempMalfunctionBool)
    const [deviceToBeReturnedBool, setDeviceToBeReturnedBool] = useState(storeDeviceInfo.deviceToBeReturnedBool)
    const [deviceReusedBool, setDeviceReusedBool] = useState(storeDeviceInfo.deviceReusedBool)

    const [progressValue, setProgressValue] = useState(0);

    const modelNumberBuilder = (group) => {
        if (group === 'Mobile HT-2000' || group === 'Installed HT-2000' || group === 'HT2000') {
            setDeviceModelNumber1('HT-2000');
        }
        if (group === 'Installed HT-1000') {
            setDeviceModelNumber1('HT-1000')
        }
    }

    useEffect(() => {
        modelNumberBuilder(storeDeviceData[0].Group);

        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(56);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const handleNext = () => {
        // combine data for reducer (temp data storage)
        let combinedDevice1 = {
            deviceThermoChemInvolved,
            deviceModelNumber1,
            deviceSerialNumber1,
            deviceTempMalfunctionBool,
            deviceToBeReturnedBool,
            deviceReusedBool
        }

        // handle status - no selection, Yes, no/unknown
        if (deviceThermoChemInvolved === '') {
            // alert('Please make a selection to advance')
        } else if (deviceThermoChemInvolved === 'Yes' || deviceThermoChemInvolved === 'Unknown') {
            if (deviceSerialNumber1 === '' || deviceModelNumber1 === '') {
                // alert('Please Add Device Model & Serial Number')
            } else {
                // update temp data related to device
                dispatch({ type: 'SET_DEVICE_INFO_1', payload: combinedDevice1 })
                // update temp data pulled from DB if user changes serial number.
                dispatch({ type: 'USER_SET_DEVICE_SERIAL', payload: { deviceSerialNumber1 } })
                history.push('/productinquiry/22')
            }
        } else if (deviceThermoChemInvolved === 'No') {
            dispatch({ type: 'SET_DEVICE_INFO_1', payload: combinedDevice1 })
            history.push('/productinquiry/26')
        }
        setUserSubmitted(true)
    }

    const summarySubmit = () => {
        let combinedDevice1 = {
            deviceThermoChemInvolved,
            deviceModelNumber1,
            deviceSerialNumber1,
            deviceTempMalfunctionBool,
            deviceToBeReturnedBool,
            deviceReusedBool
        }
        dispatch({ type: 'SET_DEVICE_INFO_1', payload: combinedDevice1 })
        dispatch({ type: 'USER_SET_DEVICE_SERIAL', payload: { deviceSerialNumber1 } })
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

                <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormLabel id="training-radio">Did the Event Involve <br /> a ThermoChem Device?</FormLabel>
                    <RadioGroup
                        aria-labelledby="deviceThermoChemInvolved-radio"
                        name="radio-buttons-group"
                        row
                        onChange={(e) => setDeviceThermoChemInvolved(e.target.value)}
                        value={deviceThermoChemInvolved}
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                    </RadioGroup>
                </FormControl>

                {deviceThermoChemInvolved === 'Yes' || deviceThermoChemInvolved === 'Unknown' ? (
                    <>
                        <TextField
                            required
                            error={deviceModelNumber1 === '' && userSubmitted ? true : false}
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='deviceModelNumber1'
                            label='Device Model Number:'
                            value={deviceModelNumber1}
                            onChange={(e) => setDeviceModelNumber1(e.target.value)}
                        />

                        <TextField
                            required
                            error={deviceSerialNumber1 === '' && userSubmitted ? true : false}
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='deviceSerialNumber1'
                            label='Serial Number:'
                            value={deviceSerialNumber1}
                            onChange={(e) => setDeviceSerialNumber1(e.target.value)}
                        />

                        <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel id="devicetempmalfunction-radio">Device:</FormLabel>
                            <RadioGroup
                                aria-labelledby="deviceTempMalfunctionBool-radio"
                                name="radio-buttons-group"
                                value={deviceTempMalfunctionBool}
                            >
                                <FormControlLabel onChange={() => setDeviceTempMalfunctionBool(true)} value="true" control={<Radio />} label="Temporary Malfunction" />
                                <FormControlLabel onChange={() => setDeviceTempMalfunctionBool(false)} value="false" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel id="devicereturned-radio">Device to be returned?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="deviceToBeReturnedBool-radio"
                                name="radio-buttons-group"
                                value={deviceToBeReturnedBool}
                            >
                                <FormControlLabel onChange={() => setDeviceToBeReturnedBool(true)} value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel onChange={() => setDeviceToBeReturnedBool(false)} value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel id="devicereturned-radio">Device to be reused?</FormLabel>
                            <RadioGroup
                                aria-labelledby="deviceReusedBool-radio"
                                name="radio-buttons-group"
                                row
                                value={deviceReusedBool}
                            >
                                <FormControlLabel onChange={() => setDeviceReusedBool(true)} value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel onChange={() => setDeviceReusedBool(false)} value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </>
                ) : null}


            </center>

            <Stack direction='row' justifyContent='space-around'>
                <Button onClick={() => history.push('/productinquiry/16')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
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

export default ProductInquiry21