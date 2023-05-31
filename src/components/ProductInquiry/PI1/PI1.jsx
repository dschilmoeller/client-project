import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'

// Steps to add new PI page:
// create folder PI# inside ProductInquiry Folder (src/components/ProductInquiry/PI#)
// Copy and create .jsx, copy function and change name; make sure it's exporting
// Go to app.jsx and import PI# 
// find the note for Product Inquiry Forms, 
// copy an existing route and modify to reflect the newly created PI#

function ProductInquiry1() {
    const history = useHistory();
    const dispatch = useDispatch();

    const userReachedSummary = useSelector(store => store.userReachedSummary)
    const storeHospital = useSelector(store => store.hospitalInfo)

    const [userSubmitted, setUserSubmitted] = useState(false)
    const [hospitalName, setHospitalName] = useState(storeHospital.hospitalName)
    const [hospitalClinicianName, setHospitalClinicianName] = useState(storeHospital.hospitalClinicianName)
    const [hospitalAddress, setHospitalAddress] = useState(storeHospital.hospitalAddress)
    const [hospitalCountry, setHospitalCountry] = useState(storeHospital.hospitalCountry)
    const [hospitalTraining, setHospitalTraining] = useState(storeHospital.hospitalTraining)

    const [progressValue, setProgressValue] = useState(0);

    const storeDeviceData = useSelector(store => store.deviceData[0])
    const addressBuilder = storeDeviceData.Street + ' ' + storeDeviceData.City + ' ' + storeDeviceData.State + ' ' + storeDeviceData.Zip

    useEffect(() => {
        // setHospitalAddress('')
        if (storeDeviceData.Street) {
            setHospitalAddress(addressBuilder)
        }
        if (storeDeviceData.Country) {
            setHospitalCountry(storeDeviceData.Country)
        }
        if (storeDeviceData.Hospital) {
            setHospitalName(storeDeviceData.Hospital)
        }
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(7);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount

    }, []);

    const submitp1 = () => {
        if (hospitalName === '' || hospitalClinicianName === '' || hospitalAddress === '' || hospitalCountry === '' || hospitalTraining === '') {
            // alert('Please Fill Out All fields')
        }
        else {
            let hospitalInfo = {
                hospitalName,
                hospitalClinicianName,
                hospitalAddress,
                hospitalCountry,
                hospitalTraining
            }

            dispatch({ type: 'SET_HOSPITAL_INFO', payload: hospitalInfo })
            history.push('/productinquiry/6')
        }
        setUserSubmitted(true)
    }

    const summarySubmit = () => {
        let hospitalInfo = {
            hospitalName,
            hospitalClinicianName,
            hospitalAddress,
            hospitalCountry,
            hospitalTraining
        }

        dispatch({ type: 'SET_HOSPITAL_INFO', payload: hospitalInfo })
        history.push('/productinquiry/summary')
    }

    return (
        <>
            <center>
                <br />
                <div className='pi-header'>
                    <Typography variant='h5'>Hospital Information</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <progress max="100" min="2" value={progressValue} data-label="Progress..."></progress>
                </div>
                <br />

                <TextField
                    required
                    multiline
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='hospitalName'
                    label='Hospital Name:'
                    error={hospitalName === '' && userSubmitted ? true : false}
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                />

                <TextField
                    required
                    multiline
                    autoFocus
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='hospitalClinicianName'
                    label='Clinician Name:'
                    error={hospitalClinicianName === '' && userSubmitted ? true : false}
                    value={hospitalClinicianName}
                    onChange={(e) => setHospitalClinicianName(e.target.value)}
                />

                <TextField
                    required
                    multiline
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='hospitalAddress'
                    label='Address:'
                    error={hospitalAddress === '' && userSubmitted ? true : false}
                    value={hospitalAddress}
                    onChange={(e) => setHospitalAddress(e.target.value)}
                />

                <TextField
                    required
                    multiline
                    sx={{ backgroundColor: 'white', margin: 2, width: .8, borderRadius: '4px' }}
                    id='hospitalCountry'
                    label='Country:'
                    error={hospitalCountry === '' && userSubmitted ? true : false}
                    value={hospitalCountry}
                    onChange={(e) => setHospitalCountry(e.target.value)}
                />

                <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormLabel id="training-radio">Has the staff completed training?*</FormLabel>
                    <RadioGroup
                        aria-labelledby="training-radio"
                        name="radio-buttons-group"
                        onChange={(e) => setHospitalTraining(e.target.value)}
                        value={hospitalTraining}
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Not Applicable" control={<Radio />} label="N/A" />
                    </RadioGroup>
                </FormControl>
            </center>

            <Stack direction='row' justifyContent='space-around'>
                <Button onClick={() => history.push('/selectform')} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
                <Button onClick={() => submitp1()} sx={{ margin: 2 }} variant='contained'>Next</Button>
            </Stack>
            {userReachedSummary ? (<>
                <Stack direction='row' justifyContent='center' sx={{ m: 2 }}>
                    <Button onClick={() => summarySubmit()} sx={{ margin: 2 }} variant='contained'>Return to Summary</Button>
                </Stack>
            </>) : null}
        </>
    )

}

export default ProductInquiry1