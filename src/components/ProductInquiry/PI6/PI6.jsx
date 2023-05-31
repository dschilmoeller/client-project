import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import moment from 'moment';


function ProductInquiry6() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const defaultDate = moment().format('YYYY-MM-D')
    const storeEventInfo = useSelector(store => store.eventInfo)

    const [userSubmitted, setUserSubmitted] = useState(false)
    const [eventReporterName, setEventReporterName] = useState(storeEventInfo.eventReporterName)
    const [eventTitle, setEventTitle] = useState(storeEventInfo.eventTitle)
    const [eventDetails, setEventDetails] = useState(storeEventInfo.eventDetails)
    const [eventDate, setEventDate] = useState(storeEventInfo.eventDate)
    const [eventAllegeCaused, setEventAllegeCaused] = useState(storeEventInfo.eventAllegeCaused)
    const [eventBodyInformed, setEventBodyInformed] = useState(storeEventInfo.eventBodyInformed)

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        if (!userReachedSummary) {
            setEventDate(defaultDate)
        } else {
            setEventDate(eventDate)
        }
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(14);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const submitp6 = () => {
        let eventInfo = {
            eventReporterName,
            eventTitle,
            eventDetails,
            eventDate,
            eventAllegeCaused,
            eventBodyInformed
        }
        if (eventReporterName === '' || eventDetails === '' || eventDate === '' || eventAllegeCaused === '') {
            // alert('Please fill out required fields')
        } else {
            dispatch({ type: 'SET_EVENT_INFO', payload: eventInfo })
            history.push('/productinquiry/10')
        }
        setUserSubmitted(true)
    }

    const summarySubmit = () => {
        let eventInfo = {
            eventReporterName,
            eventTitle,
            eventDetails,
            eventDate,
            eventAllegeCaused,
            eventBodyInformed
        }
        dispatch({ type: 'SET_EVENT_INFO', payload: eventInfo })
        history.push('/productinquiry/summary')
    }

    return (
        <>
            <center>
                <br />
                <div className='pi-header'>
                    <Typography variant='h5'>Event Information</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <progress max="100" min="2" value={progressValue} data-label="Progress..."></progress>
                </div>
                <br />
                <TextField
                    required
                    multiline
                    autoFocus
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='eventReporterName'
                    label='Reporter Name:'
                    error={eventReporterName === '' && userSubmitted ? true : false}
                    value={eventReporterName}
                    onChange={(e) => setEventReporterName(e.target.value)}
                />

                <TextField

                    multiline
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='eventTitle'
                    label='Reporter Title:'
                    error={eventTitle === '' && userSubmitted ? true : false}
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                />

                <TextField
                    required
                    multiline
                    rows={3}
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='eventDetails'
                    label='Details of event:'
                    error={eventDetails === '' && userSubmitted ? true : false}
                    value={eventDetails}
                    onChange={(e) => setEventDetails(e.target.value)}
                />

                <TextField
                    required
                    type='date'
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='eventDate'
                    label='Date of event:'
                    value={eventDate}
                    error={eventDate === '' && userSubmitted ? true : false}
                    onChange={(e) => setEventDate(e.target.value)}
                />


                <FormControl sx={{ display: 'flex', alignItems: 'center', margin: 2, marginTop: 0, marginBottom: 0 }}>
                    <FormLabel id="allege-caused-radio">Does Physician allege event was caused by device?*</FormLabel>
                    <RadioGroup
                        aria-labelledby="allege-cause-radio"
                        name="radio-buttons-group"
                        row
                        onChange={(e) => setEventAllegeCaused(e.target.value)}
                        value={eventAllegeCaused}

                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Not Applicable" control={<Radio />} label="N/A" />
                    </RadioGroup>
                </FormControl>

                <FormControl sx={{ display: 'flex', alignItems: 'center', margin: 2, marginTop: 0, marginBottom: 0 }}>
                    <FormLabel id="body-informed-radio">Governing body informed of event?</FormLabel>
                    <RadioGroup
                        aria-labelledby="body-informed-radio"
                        name="radio-buttons-group"
                        row
                        onChange={(e) => setEventBodyInformed(e.target.value)}
                        value={eventBodyInformed}
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Not Applicable" control={<Radio />} label="N/A" />
                    </RadioGroup>
                </FormControl>


            </center>

            <div className='ButtonContainer'>
                <Button onClick={() => history.push('/productinquiry/1')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
                <Button onClick={submitp6} sx={{ margin: 2 }} variant='contained'>Next</Button>
            </div>
            {userReachedSummary ? (<>
                <Stack direction='row' justifyContent='center' sx={{ m: 2 }}>
                    <Button onClick={() => summarySubmit()} sx={{ margin: 2 }} variant='contained'>Return to Summary</Button>
                </Stack>
            </>) : null}
        </>
    )

}

export default ProductInquiry6;