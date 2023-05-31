import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';

// continued from PI16 if YES is selected.

function ProductInquiry17() {
    const history = useHistory();
    const dispatch = useDispatch();
    const defaultDate = moment().format('YYYY-MM-D')

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        if (!userReachedSummary) {
            setDisposableExpirationDate2(defaultDate)
            
        } else {
            setDisposableExpirationDate2(disposableExpirationDate2)
        }
        

        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(49);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storeDisposableInfo = useSelector(store => store.disposableInfo)

    const [disposableReplacementUsed, setDisposableReplacementUsed] = useState(storeDisposableInfo.disposableReplacementUsed)
    const [disposableProductName2, setDisposableProductName2] = useState(storeDisposableInfo.disposableProductName2)
    const [disposableProductNumber2, setDisposableProductNumber2] = useState(storeDisposableInfo.disposableProductNumber2)
    const [disposableLotNumber2, setDisposableLotNumber2] = useState(storeDisposableInfo.disposableLotNumber2)
    const [disposableExpirationDate2, setDisposableExpirationDate2] = useState(storeDisposableInfo.disposableExpirationDate2)

    const handleNext = () => {
        let combinedDisposable = {
            disposableReplacementUsed,
            disposableProductName2,
            disposableProductNumber2,
            disposableLotNumber2,
            disposableExpirationDate2
        }
        dispatch({ type: 'SET_DISPOSABLE_INFO_2', payload: combinedDisposable })
        history.push('/productinquiry/21')
    }

    const summarySubmit = () => {
        let combinedDisposable = {
            disposableReplacementUsed,
            disposableProductName2,
            disposableProductNumber2,
            disposableLotNumber2,
            disposableExpirationDate2
        }
        dispatch({ type: 'SET_DISPOSABLE_INFO_2', payload: combinedDisposable })
        history.push('/productinquiry/summary')
    }

    return (
        <>
            <center>
                <br />
                <div className='pi-header'>
                    <Typography variant='h5'>Disposable Information</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <progress max="100" min="2" value={progressValue} data-label="Progress..."></progress>
                </div>
                <br />

                <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormLabel id="training-radio">Was a replacement disposable used?</FormLabel>
                    <RadioGroup
                        aria-labelledby="replacement-disposable-radio"
                        name="radio-buttons-group"
                        row
                        onChange={(e) => setDisposableReplacementUsed(e.target.value)}
                        value={disposableReplacementUsed}
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                    </RadioGroup>
                </FormControl>

                {disposableReplacementUsed === 'Yes' || disposableReplacementUsed === 'Unknown' ?
                    <>
                        <TextField
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='disposableProductName2'
                            label='Disposable Product Name:'
                            value={disposableProductName2}
                            onChange={(e) => setDisposableProductName2(e.target.value)}
                        />

                        <TextField
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='disposableProductNumber2'
                            label='Disposable Product Number:'
                            value={disposableProductNumber2}
                            onChange={(e) => setDisposableProductNumber2(e.target.value)}
                        />

                        <TextField
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='disposableLotNumber2'
                            label='Lot Number:'
                            value={disposableLotNumber2}
                            onChange={(e) => setDisposableLotNumber2(e.target.value)}
                        />

                        <TextField
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='disposableExpirationDate2'
                            label='Expiration Date:'
                            type='date'
                            value={disposableExpirationDate2}
                            onChange={(e) => setDisposableExpirationDate2(e.target.value)}
                        />
                    </>
                    : null}


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

export default ProductInquiry17