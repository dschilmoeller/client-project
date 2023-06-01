import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// PI33 continued from PI32 continues to addImage

function ProductInquiry33() {
    const history = useHistory();
    const dispatch = useDispatch();
    const defaultDate = moment().format('YYYY-MM-DD')

    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storeRepReportingInfo = useSelector(store => store.repReportingInfo)

    const [repDateReportedBy, setRepDateReportedBy] = useState(storeRepReportingInfo.repDateReportedBy)
    const [repDateReportedToTherma, setRepDateReportedToTherma] = useState(storeRepReportingInfo.repDateReportedToTherma)

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        // Simulate a delay of 0.5 seconds before updating the progress
        if (!userReachedSummary) {
            setRepDateReportedBy(defaultDate)
            setRepDateReportedToTherma(defaultDate)
        } else {
            setRepDateReportedBy(repDateReportedBy)
            setRepDateReportedToTherma(repDateReportedToTherma)
        }


        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(84);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const handleNext = () => {
        if (repDateReportedBy === '' || repDateReportedToTherma === '') {
            alert('Please fill out dates')
        } else {
            let combinedRep3 = {
                repDateReportedBy,
                repDateReportedToTherma
            }
            dispatch({ type: 'SET_REPREPORTING_INFO_3', payload: combinedRep3 })
            history.push('/productinquiry/addImage')
        }
    }

    const summarySubmit = () => {
        let combinedRep3 = {
            repDateReportedBy,
            repDateReportedToTherma
        }
        dispatch({ type: 'SET_REPREPORTING_INFO_3', payload: combinedRep3 })
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

                <Typography sx={{margin: 2}}>
                    Date the event was reported to representative,
                    if different than the date the event occurred:
                </Typography>

                <TextField
                    type='date'
                    sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                    id='repDateReportedBy'
                    label='Rep Reported Date:'
                    value={repDateReportedBy}
                    onChange={(e) => setRepDateReportedBy(e.target.value)}
                />

                <Typography sx={{margin: 2}}>
                    Date the event was reported to ThermaSolutions,
                    if different than the date the event occurred:
                </Typography>

                <TextField
                    type='date'
                    sx={{ backgroundColor: 'white', margin: 2, width: .8 }}
                    id='repDateReportedToTherma'
                    label='ThermaSolutions Reported Date:'
                    value={repDateReportedToTherma}
                    onChange={(e) => setRepDateReportedToTherma(e.target.value)}
                />

            </center>

            <Stack direction='row' justifyContent='space-around'>
                <Button onClick={() => history.push('/productinquiry/32')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
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

export default ProductInquiry33