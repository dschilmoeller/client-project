import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

function ProductInquiry10() {
    const history = useHistory();
    const dispatch = useDispatch();

    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storePatientInfo = useSelector(store => store.patientInfo)

    const [userSubmitted, setUserSubmitted] = useState(false)
    const [patientImpacted, setPatientImpacted] = useState(storePatientInfo.patientImpacted);
    const [patientIdentifier, setPatientIdentifier] = useState(storePatientInfo.patientIdentifier)
    const [patientAge, setPatientAge] = useState(storePatientInfo.patientAge)
    const [patientSex, setPatientSex] = useState(storePatientInfo.patientSex)
    const [patientWeight, setPatientWeight] = useState(storePatientInfo.patientWeight)
    const [patientCondition, setPatientCondition] = useState(storePatientInfo.patientCondition)

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(25);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const submitp10 = () => {
        let patientInfo = {
            patientImpacted,
            patientIdentifier,
            patientAge,
            patientSex,
            patientWeight,
            patientCondition
        }

        if (patientImpacted === '') {
            // alert('Please make a selection to advance')
        } else if (patientImpacted === 'Yes') {
            if (patientIdentifier === '' || patientAge === '' || patientSex === '' || patientWeight === '' || patientCondition === '') {
                // Don't do nothin.
            } else {
                dispatch({ type: 'SET_PATIENT_INFO_1', payload: patientInfo })
                history.push('/productinquiry/12');
            }
        } else if (patientImpacted === 'No') {
            dispatch({ type: 'SET_PATIENT_INFO_1', payload: patientInfo })
            history.push('/productinquiry/16');
        }
        setUserSubmitted(true)
    }

    const summarySubmit = () => {
        let patientInfo = {
            patientImpacted,
            patientIdentifier,
            patientAge,
            patientSex,
            patientWeight,
            patientCondition
        }
        dispatch({ type: 'SET_PATIENT_INFO_1', payload: patientInfo })
        history.push('/productinquiry/summary');
    }


    return (
        <>
            <center>
                <br />
                <div className='pi-header'>
                    <Typography variant='h5'>Patient Information</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <progress max="100" min="2" value={progressValue} data-label="Progress..."></progress>
                </div>
                <br />
                <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormLabel id="patient-impacted-radio">Was Patient impacted from event?</FormLabel>
                    <RadioGroup
                        aria-labelledby="patient-impacted-radio"
                        name="radio-buttons-group"
                        row
                        onChange={(e) => setPatientImpacted(e.target.value)}
                        value={patientImpacted}
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>

                {patientImpacted === 'Yes' ? (
                    <>
                        <TextField
                            required
                            multiline
                            autoFocus
                            sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                            id='patientIdentifier'
                            label='Patient Identifier:'
                            error={patientIdentifier === '' && userSubmitted ? true : false}
                            value={patientIdentifier}
                            onChange={(e) => setPatientIdentifier(e.target.value)}
                        />

                        <TextField
                            required
                            multiline
                            sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                            id='patientAge'
                            label='Age:'
                            error={patientAge === '' && userSubmitted ? true : false}
                            value={patientAge}
                            onChange={(e) => setPatientAge(e.target.value)}
                        />

                        <TextField
                            required
                            multiline
                            sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                            id='patientSex'
                            label='Sex:'
                            error={patientSex === '' && userSubmitted ? true : false}
                            value={patientSex}
                            onChange={(e) => setPatientSex(e.target.value)}
                        />

                        <TextField
                            required
                            multiline
                            sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                            id='patientWeight'
                            label='Weight:'
                            error={patientWeight === '' && userSubmitted ? true : false}
                            value={patientWeight}
                            onChange={(e) => setPatientWeight(e.target.value)}
                        />
                        <TextField
                            required
                            multiline
                            rows={4}
                            sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                            id='patientCondition'
                            error={patientCondition === '' && userSubmitted ? true : false}
                            label='Condition after event:'
                            value={patientCondition}
                            onChange={(e) => setPatientCondition(e.target.value)}
                        />

                    </>
                ) : null}

            </center>

            <div className='ButtonContainer'>
                <Button onClick={() => history.push('/productinquiry/6')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
                <Button onClick={submitp10} sx={{ margin: 2 }} variant='contained'>Next</Button>
            </div>
            {userReachedSummary ? (<>
                <Stack direction='row' justifyContent='center' sx={{ m: 2 }}>
                    <Button onClick={() => summarySubmit()} sx={{ margin: 2 }} variant='contained'>Return to Summary</Button>
                </Stack>
            </>) : null}
        </>
    )

}

export default ProductInquiry10;