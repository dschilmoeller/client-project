import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
// start of disposable information
// continues on PI17 / jumps to PI21 if NO is selected.

function ProductInquiry16() {
    const history = useHistory();
    const dispatch = useDispatch();
    const defaultDate = moment().format('YYYY-MM-D')

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        if (!userReachedSummary) {
            setDisposableExpirationDate1(defaultDate)
        } else {
            setDisposableExpirationDate1(disposableExpirationDate1)
        }

        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(42);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    useEffect(() => {
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(42);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    useEffect(() => {
        dispatch({
            type: 'RETURN_DISPOSABLE_INFO'
        });
    }, [])

    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storeDisposableInfo = useSelector(store => store.disposableInfo)
    const [disposableSterileKitInvolved, setDisposableSterileKitInvolved] = useState(storeDisposableInfo.disposableSterileKitInvolved)
    const [disposableProductName1, setDisposableProductName1] = useState(storeDisposableInfo.disposableProductName1)
    const [disposableProductNumber1, setDisposableProductNumber1] = useState(storeDisposableInfo.disposableProductNumber1)
    const [disposableLotNumber1, setDisposableLotNumber1] = useState(storeDisposableInfo.disposableLotNumber1)
    const [disposableExpirationDate1, setDisposableExpirationDate1] = useState(storeDisposableInfo.disposableExpirationDate1)

    const handleNext = () => {
        // combine data for reducer
        let combinedDisposable = {
            disposableSterileKitInvolved,
            disposableProductName1,
            disposableProductNumber1,
            disposableLotNumber1,
            disposableExpirationDate1,
        }

        // handle status - no selection, yes, no/unknown
        if (disposableSterileKitInvolved === '') {
            // alert('Please make a selection to advance')
        } else if (disposableSterileKitInvolved === 'Yes') {
            dispatch({ type: 'SET_DISPOSABLE_INFO_1', payload: combinedDisposable })
            history.push('/productinquiry/17')
        } else if (disposableSterileKitInvolved === 'No' || disposableSterileKitInvolved === 'Unknown') {
            dispatch({ type: 'SET_DISPOSABLE_INFO_1', payload: combinedDisposable })
            history.push('/productinquiry/21')
        }
    }

    const summarySubmit = () => {
        let combinedDisposable = {
            disposableSterileKitInvolved,
            disposableProductName1,
            disposableProductNumber1,
            disposableLotNumber1,
            disposableExpirationDate1,
        }
        dispatch({ type: 'SET_DISPOSABLE_INFO_1', payload: combinedDisposable })
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

                <FormControl sx={{ margin: 2, marginTop: 0, display: 'flex', alignItems: 'center' }}>
                    <FormLabel id="training-radio">Did the event involve <br /> a sterile disposable kit?</FormLabel>
                    <RadioGroup
                        aria-labelledby="training-radio"
                        name="radio-buttons-group"
                        row
                        onChange={(e) => setDisposableSterileKitInvolved(e.target.value)}
                        value={disposableSterileKitInvolved}
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                    </RadioGroup>
                </FormControl>

                {disposableSterileKitInvolved === 'Yes' || disposableSterileKitInvolved === 'Unknown' ? (
                    <>
                        <TextField
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='disposableProductName1'
                            label='Product Name:'
                            value={disposableProductName1}
                            onChange={(e) => setDisposableProductName1(e.target.value)}
                        />

                        <TextField
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='disposableProductName1'
                            label='Product Number:'
                            value={disposableProductNumber1}
                            onChange={(e) => setDisposableProductNumber1(e.target.value)}
                        />

                        <TextField
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='disposableLotNumber1'
                            label='Lot Number:'
                            value={disposableLotNumber1}
                            onChange={(e) => setDisposableLotNumber1(e.target.value)}
                        />

                        <TextField
                            sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                            id='disposableExpirationDate1'
                            label='Expiration Date:'
                            type='date'
                            value={disposableExpirationDate1}
                            onChange={(e) => setDisposableExpirationDate1(e.target.value)}
                        />


                    </>
                ) : null}
            </center>


            <Stack direction='row' justifyContent='space-around'>
                <Button onClick={() => history.push('/productinquiry/12')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
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

export default ProductInquiry16