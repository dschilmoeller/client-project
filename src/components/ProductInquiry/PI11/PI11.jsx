import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Typography, Stack} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


function ProductInquiry11() {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storePatientInfo = useSelector(store => store.patientInfo)

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
            setProgressValue(28);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const submitp11 = () => {
        let patientInfo = {
            patientIdentifier,
            patientAge,
            patientSex,
            patientWeight,
            patientCondition
        }
        dispatch({ type: 'SET_PATIENT_INFO_2', payload: patientInfo })
        history.push('/productinquiry/12')
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
                <TextField
                    autoFocus
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='patientIdentifier'
                    label='Patient Identifier:'
                    value={patientIdentifier}
                    onChange={(e) => setPatientIdentifier(e.target.value)}
                />

                <TextField
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='patientAge'
                    label='Age:'
                    type='number'
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                />

                <TextField
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='patientSex'
                    label='Sex:'
                    value={patientSex}
                    onChange={(e) => setPatientSex(e.target.value)}
                />

                <TextField
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='patientWeight'
                    label='Weight (lbs):'
                    type='number'
                    value={patientWeight}
                    onChange={(e) => setPatientWeight(e.target.value)}
                />
                <TextField
                    multiline
                    rows={4}
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='patientCondition'
                    label='Condition after event:'
                    value={patientCondition}
                    onChange={(e) => setPatientCondition(e.target.value)}
                />

            </center>

            <div className='ButtonContainer'>
                <Button onClick={() => history.push('/productinquiry/10')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
                <Button onClick={submitp11} sx={{ margin: 2 }} variant='contained'>Next</Button>
            </div>
            {userReachedSummary ? (<>
                <Stack direction='row' justifyContent='center' sx={{ m: 2 }}>
                    <Button onClick={() => history.push('/productinquiry/summary')} sx={{ margin: 2 }} variant='contained'>Return to Summary</Button>
                </Stack>
            </>) : null}
        </>
    )

}

export default ProductInquiry11;