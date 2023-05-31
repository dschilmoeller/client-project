import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// PI32 Continued from PI31 continues to PI33


function ProductInquiry32() {
    const history = useHistory();
    const dispatch = useDispatch();

    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storeRepReportingInfo = useSelector(store => store.repReportingInfo)

    const [userSubmitted, setUserSubmitted] = useState(false)
    const [repCommunicatedMethod, setRepCommunicatedMethod] = useState(storeRepReportingInfo.repCommunicatedMethod)
    const [repOtherDescription, setRepOtherDescription] = useState(storeRepReportingInfo.repOtherDescription)

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(77);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const handleNext = () => {
        if (repCommunicatedMethod === 'other' && repOtherDescription === '') {
            // alert('Please enter a description')
        } else if (repCommunicatedMethod != '') {
            let combinedRep = {
                repCommunicatedMethod,
                repOtherDescription
            }
            dispatch({ type: 'SET_REPREPORTING_INFO_2', payload: combinedRep })
            history.push('/productinquiry/33')
        } else {
            // alert('Please make a selection!')
        }
        setUserSubmitted(true)
    }

    const summarySubmit = () => {
        let combinedRep = {
            repCommunicatedMethod,
            repOtherDescription
        }
        dispatch({ type: 'SET_REPREPORTING_INFO_2', payload: combinedRep })
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
                    <FormLabel id="devicereturned-radio">Event was communicated <br /> to representative via:</FormLabel>
                    <RadioGroup
                        aria-labelledby="repCommunicatedMethod-radio"
                        name="radio-buttons-group"
                        value={repCommunicatedMethod}
                    >
                        <FormControlLabel onChange={() => setRepCommunicatedMethod('teletext')} value="teletext" control={<Radio />} label="Telephone/Text" />
                        <FormControlLabel onChange={() => setRepCommunicatedMethod('emailletter')} value="emailletter" control={<Radio />} label="Email/Letter" />
                        <FormControlLabel onChange={() => setRepCommunicatedMethod('inperson')} value="inperson" control={<Radio />} label="In Person" />
                        <FormControlLabel onChange={() => setRepCommunicatedMethod('other')} value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>

                {repCommunicatedMethod === 'other' ? (
                    <>

                        <TextField
                            rows={3}
                            multiline
                            required
                            error={repOtherDescription === '' && userSubmitted ? true : false}
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='repOtherDescription'
                            label='Communication Details:'
                            value={repOtherDescription}
                            onChange={(e) => setRepOtherDescription(e.target.value)}
                        />
                    </>
                ) : null}

            </center>

            <Stack direction='row' justifyContent='space-around'>
                <Button onClick={() => history.push('/productinquiry/31')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
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

export default ProductInquiry32