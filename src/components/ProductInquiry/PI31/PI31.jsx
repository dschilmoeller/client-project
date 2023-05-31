import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

// PI31 - continues to PI32 if yes is selected / jumps to addimage if NO is selected


function ProductInquiry31() {
    const history = useHistory();
    const dispatch = useDispatch();

    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storeRepReportingInfo = useSelector(store => store.repReportingInfo)

    const [userSubmitted, setUserSubmitted] = useState(false)
    const [repReportingBool, setRepReportingBool] = useState(storeRepReportingInfo.repReportingBool)
    const [repName, setRepName] = useState(storeRepReportingInfo.repName)
    const [repCompanyName, setRepCompanyName] = useState(storeRepReportingInfo.repCompanyName)
    const [repContactInfo, setRepContactInfo] = useState(storeRepReportingInfo.repContactInfo)
    const [repPresent, setRepPresent] = useState(storeRepReportingInfo.repPresent)

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(70);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const handleNext = () => {
        // combine data for reducer
        let combinedRep = {
            repReportingBool,
            repName,
            repCompanyName,
            repContactInfo,
            repPresent
        }


        // handle status - no selection, true, false
        if (repReportingBool === null) {
            // alert('Please make a selection to advance')
        } else if (repReportingBool === true) {
            if (repName === '' || repCompanyName === '' || repContactInfo === '') {
                // alert('Please fill out all required fields')
            } else {
                dispatch({ type: 'SET_REPREPORTING_INFO_1', payload: combinedRep })
                history.push('/productinquiry/32')
            }
        } else if (repReportingBool === false) {
            dispatch({ type: 'SET_REPREPORTING_INFO_1', payload: combinedRep })
            history.push('/productinquiry/addImage')
        }
        setUserSubmitted(true)
    }

    const summarySubmit = () => {
        let combinedRep = {
            repReportingBool,
            repName,
            repCompanyName,
            repContactInfo,
            repPresent
        }
        dispatch({ type: 'SET_REPREPORTING_INFO_1', payload: combinedRep })
        history.push('/productinquiry/summary')
    }

    return (
        <>
            <center>
                <br />
                <div className='pi-header'>
                    <Typography variant='h5'>Representative Information</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <progress max="100" min="2" value={progressValue} data-label="Progress..."></progress>
                </div>
                <br />

                <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormLabel id="devicereturned-radio">Are you a ThermaSolutions <br />Representative?</FormLabel>
                    <RadioGroup
                        aria-labelledby="repReportingBool-radio"
                        name="radio-buttons-group"
                        row
                        value={repReportingBool}
                    >
                        <FormControlLabel onChange={() => setRepReportingBool(true)} value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel onChange={() => setRepReportingBool(false)} value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>

                {repReportingBool ? (
                    <>

                        <TextField
                            required
                            multiline
                            error={repName === '' && userSubmitted ? true : false}
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='repName'
                            label='Representative Name'
                            value={repName}
                            onChange={(e) => setRepName(e.target.value)}
                        />

                        <TextField
                            required
                            multiline
                            error={repCompanyName === '' && userSubmitted ? true : false}
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='repCompanyName'
                            label='Company Name:'
                            value={repCompanyName}
                            onChange={(e) => setRepCompanyName(e.target.value)}
                        />

                        <TextField
                            required
                            multiline
                            error={repContactInfo === '' && userSubmitted ? true : false}
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='repContactInfo'
                            label='Contact Information:'
                            value={repContactInfo}
                            onChange={(e) => setRepContactInfo(e.target.value)}
                        />

                        <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel id="devicereturned-radio">Was representative present <br /> during event?</FormLabel>
                            <RadioGroup
                                aria-labelledby="repPresent-radio"
                                name="radio-buttons-group"
                                row
                                onChange={(e) => setRepPresent(e.target.value)}
                                value={repPresent}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                <FormControlLabel value="Not Applicable" control={<Radio />} label="N/A" />
                            </RadioGroup>
                        </FormControl>

                    </>
                ) : null}
            </center>

            <Stack direction='row' justifyContent='space-around'>
                <Button onClick={() => history.push('/productinquiry/26')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
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

export default ProductInquiry31