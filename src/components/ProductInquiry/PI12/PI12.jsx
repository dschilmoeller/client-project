import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


function ProductInquiry12() {
    const history = useHistory();
    const dispatch = useDispatch();

    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storePatientInfo = useSelector(store => store.patientInfo)

    const [userSubmitted, setUserSubmitted] = useState(false)
    const [patientAdverseConsequences, setPatientAdverseConsequences] = useState(storePatientInfo.patientAdverseConsequences)
    const [patientDescribe, setPatientDescribe] = useState(storePatientInfo.patientDescribe)

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(35);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const submitp12 = () => {
        let patientInfo = {
            patientAdverseConsequences,
            patientDescribe
        }
        if (patientAdverseConsequences === '') {
            // alert('Please make a selection below')
        } else if (patientAdverseConsequences === 'Yes' && patientDescribe != '') {
            dispatch({ type: 'SET_PATIENT_INFO_3', payload: patientInfo })
            history.push('/productinquiry/16')
        } else if (patientAdverseConsequences === 'Yes' && patientDescribe === '') {
            // alert('Please include details below.')
        } else {
            dispatch({ type: 'SET_PATIENT_INFO_3', payload: patientInfo })
            history.push('/productinquiry/16')
        }
        setUserSubmitted(true)
    }

    const summarySubmit = () => {
        let patientInfo = {
            patientAdverseConsequences,
            patientDescribe
        }
        dispatch({ type: 'SET_PATIENT_INFO_3', payload: patientInfo })
        history.push('/productinquiry/summary')
    }
    return (
        <>
            <center>
                <br />
                <div className='pi-header' >
                    <Typography variant='h5'>Patient Information</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <progress max="100" min="2" value={progressValue} data-label="Progress..."></progress>
                </div>
                <br />

                <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormLabel id="adverse-consequences-radio">Patient experience any adverse consequences due to event?</FormLabel>
                    <RadioGroup
                        aria-labelledby="adverse-consequences-radio"
                        name="radio-buttons-group"
                        row
                        onChange={(e) => setPatientAdverseConsequences(e.target.value)}
                        value={patientAdverseConsequences}
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Not Applicable" control={<Radio />} label="N/A" />
                    </RadioGroup>
                </FormControl>

                {patientAdverseConsequences === 'Yes' ? (
                    <>
                        <TextField
                            required
                            multiline
                            autoFocus
                            rows={8}
                            sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                            id='patientDescribe'
                            label='Please Describe:'
                            error={patientDescribe === '' && userSubmitted ? true : false}
                            value={patientDescribe}
                            onChange={(e) => setPatientDescribe(e.target.value)}
                        />

                    </>
                ) : null}
            </center>

            <div className='ButtonContainer'>
                <Button onClick={() => history.push('/productinquiry/10')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
                <Button onClick={submitp12} sx={{ margin: 2 }} variant='contained'>Next</Button>
            </div>
            {userReachedSummary ? (<>
                <Stack direction='row' justifyContent='center' sx={{ m: 2 }}>
                    <Button onClick={() => summarySubmit()} sx={{ margin: 2 }} variant='contained'>Return to Summary</Button>
                </Stack>
            </>) : null}
        </>
    )

}

export default ProductInquiry12;