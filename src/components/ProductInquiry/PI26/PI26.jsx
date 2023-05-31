import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

// PI26 Continues to PI31 regardless of choice.

function ProductInquiry26() {
    const history = useHistory();
    const dispatch = useDispatch();

    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storeComponent = useSelector(store => store.componentInfo)

    const [componentReusableInvolved, setComponentReusableInvolved] = useState(storeComponent.componentReusableInvolved)
    const [componentName, setComponentName] = useState(storeComponent.componentName)
    const [componentProductNumber, setComponentProductNumber] = useState(storeComponent.componentProductNumber)

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(63);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const handleNext = () => {
        if (componentReusableInvolved === '') {
            // alert('please make a selection')
        } else {
            let combinedComponent = {
                componentReusableInvolved,
                componentName,
                componentProductNumber
            }
            dispatch({ type: 'SET_COMPONENT_INFO', payload: combinedComponent })
            history.push('/productinquiry/31')
        }
    }

    const summarySubmit = () => {
        let combinedComponent = {
            componentReusableInvolved,
            componentName,
            componentProductNumber
        }
        dispatch({ type: 'SET_COMPONENT_INFO', payload: combinedComponent })
        history.push('/productinquiry/summary')
    }

    return (
        <>
            <center>
                <br />
                <div className='pi-header'>
                    <Typography variant='h5'>Component Information</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <progress max="100" min="2" value={progressValue} data-label="Progress..."></progress>
                </div>
                <br />

                <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormLabel id="devicereturned-radio">Did the event involve<br /> a reusable component?</FormLabel>
                    <RadioGroup
                        aria-labelledby="componentReusableInvolved-radio"
                        name="radio-buttons-group"
                        row
                        onChange={(e) => setComponentReusableInvolved(e.target.value)}
                        value={componentReusableInvolved}
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                    </RadioGroup>
                </FormControl>

                {componentReusableInvolved === 'Yes' || componentReusableInvolved === 'Unknown' ? (
                    <>

                        <TextField
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='componentName'
                            label='Component Name:'
                            value={componentName}
                            onChange={(e) => setComponentName(e.target.value)}
                        />

                        <TextField
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='componentProductNumber'
                            label='Product Number:'
                            value={componentProductNumber}
                            onChange={(e) => setComponentProductNumber(e.target.value)}
                        />

                    </>
                ) : null}

            </center>

            <Stack direction='row' justifyContent='space-around'>
                <Button onClick={() => history.push('/productinquiry/22')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
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

export default ProductInquiry26