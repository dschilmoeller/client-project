import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import { Stack, Button, Grid, Typography } from '@mui/material';
// TODO: Show images at the end of the summary

function PI_Summary() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(95);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    useEffect(() => {
        dispatch({
            type: 'SET_USER_REACHED_SUMMARY',
            payload: { userReachedSummary: true }
        });
    }, [])

    const hospitalInfo = useSelector(store => store.hospitalInfo)
    const eventInfo = useSelector(store => store.eventInfo)
    const patientInfo = useSelector(store => store.patientInfo)
    const disposableInfo = useSelector(store => store.disposableInfo)
    const deviceInfo = useSelector(store => store.deviceInfo)
    const componentInfo = useSelector(store => store.componentInfo)
    const repReportingInfo = useSelector(store => store.repReportingInfo)
    const imageurl = useSelector(store => store.imageurl)

    const summaryInfo = {
        hospitalInfo,
        eventInfo,
        patientInfo,
        disposableInfo,
        deviceInfo,
        componentInfo,
        repReportingInfo,
        imageurl
    }

    const submitSummary = () => {
        console.log(summaryInfo);
        dispatch({ type: 'SAVE_PRODUCT_INQUIRY_SUMMARY', payload: summaryInfo });
        dispatch({type: 'CLEAR_ALL_REDUCERS'})
        history.push('/submissioncompletedPI')
    }

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <progress max="100" min="2" value={progressValue} data-label="Progress..."></progress>
            </div>
            {/* <h1>A summary:</h1>
            <button onClick={() => submitSummary()}>Submit</button> */}

            <Grid container
                direction='column'
                justify='center'
                alignItems=''
                alignContent='center'
                padding={2} >
                <Grid item xs={12}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="h6">Information about the Hospital where the event occurred:</Typography>
                        <IconButton onClick={() => history.push('/productinquiry/1')}><EditIcon /></IconButton>
                    </Stack>
                    <Typography fullWidth
                        alignSelf='flex-start'
                        sx={{ margin: 1, fontSize: 'medium' }}>
                        Hospital Name: <br /><b>{hospitalInfo.hospitalName}</b>
                        <br />Clinician Name: <br /> <b>{hospitalInfo.hospitalClinicianName}</b>
                        <br />Hospital Address: <br /> <b>{hospitalInfo.hospitalAddress}</b>
                        <br />Country: <br /> <b>{hospitalInfo.hospitalCountry}</b>
                        <br />Staff Completed Training? <br /> <b>{hospitalInfo.hospitalTraining}</b>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="h6">Information about the Event:</Typography>
                        <IconButton onClick={() => history.push('/productinquiry/6')}><EditIcon /></IconButton>
                    </Stack>
                    <Typography fullWidth
                        alignSelf='flex-start'
                        sx={{ margin: 1, fontSize: 'small' }}>
                        Reporter Name: <br /><b>{eventInfo.eventReporterName}</b>
                        <br />Reporter Title: <br /><b>{eventInfo.eventTitle}</b>
                        <br />Event Details: <br /><b>{eventInfo.eventDetails}</b>
                        <br />Date Event Occurred: <br /><b>{eventInfo.eventDate}</b>
                        <br /><b>Physician</b> alleges event was caused by device? <br /><b>{eventInfo.eventAllegeCaused}</b>
                        <br />Was a governing body informed of event? <br /><b>{eventInfo.eventBodyInformed}</b>

                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="h6">Patient Information:</Typography>
                        <IconButton onClick={() => history.push('/productinquiry/10')}><EditIcon /></IconButton>
                    </Stack>
                    <Typography fullWidth
                        alignSelf='flex-start'
                        sx={{ margin: 1, fontSize: 'small' }}>
                        Patient Impact? <br /><b>{patientInfo.patientImpacted}</b>
                        {patientInfo.patientImpacted === 'Yes' ? (
                            <>
                                <br />Patient Identifier: <br /><b>{patientInfo.patientIdentifier}</b>
                                <br />Patient Age: <br /><b>{patientInfo.patientAge}</b>
                                <br />Patient Sex: <br /><b>{patientInfo.patientSex}</b>
                                <br />Patient Weight: <br /><b>{patientInfo.patientWeight}</b>
                                <br />Patient Condition: <br /><b>{patientInfo.patientCondition}</b>
                                <br />Did the patient experience adverse consequences? <br /><b>{patientInfo.patientAdverseConsequences}</b>
                                {patientInfo.patientAdverseConsequences === 'Yes' ? (
                                    <>
                                        <br />Description of adverse consequences: <br /><b>{patientInfo.patientDescribe}</b>
                                    </>
                                ) : null}
                            </>
                        ) : null}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="h6">Disposable Information:</Typography>
                        <IconButton onClick={() => history.push('/productinquiry/16')}><EditIcon /></IconButton>
                    </Stack>
                    <Typography fullWidth
                        alignSelf='flex-start'
                        sx={{ margin: 1, fontSize: 'small' }}>
                        Did the event involve a sterile disposable item or kit? <br /><b>{disposableInfo.disposableSterileKitInvolved}</b>
                        {disposableInfo.disposableSterileKitInvolved === 'Yes' ? (
                            <>
                                <br />Product name: <br /><b>{disposableInfo.disposableProductName1}</b>
                                <br />Product number: <br /><b>{disposableInfo.disposableProductNumber1}</b>
                                <br />Lot number: <br /><b>{disposableInfo.disposableLotNumber1}</b>
                                <br />Expiration Date: <br /><b>{disposableInfo.disposableExpirationDate1}</b>
                                <br />Was a Disposable replacement used? <br /><b>{disposableInfo.disposableReplacementUsed}</b>
                                {disposableInfo.disposableSterileKitInvolved === 'Yes' ? (<>
                                    <br />Replacement device product name: <br /><b>{disposableInfo.disposableProductName2}</b>
                                    <br />Replacement device product number:<br /><b>{disposableInfo.disposableProductNumber2}</b>
                                </>) : null}
                            </>
                        ) : null}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="h6">Device Information:</Typography>
                        <IconButton onClick={() => history.push('/productinquiry/21')}><EditIcon /></IconButton>
                    </Stack>
                    <Typography fullWidth
                        alignSelf='flex-start'
                        sx={{ margin: 1, fontSize: 'small' }}>
                        Did the event involve a ThermoChem Device? <br /><b>{deviceInfo.deviceThermoChemInvolved}</b>
                        {deviceInfo.deviceThermoChemInvolved === 'Yes' ? (<>
                            <br />Device Model Number <br /><b>{deviceInfo.deviceModelNumber1}</b>
                            <br />Device Serial Number <br /><b>{deviceInfo.deviceSerialNumber1}</b>
                            <br />Temporary Malfunction? <br /><b>{deviceInfo.deviceTempMalfunctionBool ? ('Yes') : ('No')}</b>
                            <br />Device to be returned? <br /><b>{deviceInfo.deviceToBeReturnedBool ? ('Yes') : ('No')}</b>
                            <br />Device to be reused? <br /><b>{deviceInfo.deviceReusedBool ? ('Yes') : ('No')}</b>
                            <br />Was a replacement device used? <br /><b>{deviceInfo.deviceReplacementUsed}</b>
                            {deviceInfo.deviceReplacementUsed === 'Yes' ? (<></>) : null}
                            <br />Replacement Device Model Number: <br /><b>{deviceInfo.deviceModelNumber2}</b>
                            <br />Replacement Device Serial Number: <br /><b>{deviceInfo.deviceSerialNumber2}</b>
                        </>) : null}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="h6">Component Information:</Typography>
                        <IconButton onClick={() => history.push('/productinquiry/26')}><EditIcon /></IconButton>
                    </Stack>
                    <Typography fullWidth
                        alignSelf='flex-start'
                        sx={{ margin: 1, fontSize: 'small' }}>
                        Did the Event Inovlve a reusable component? <br /><b>{componentInfo.componentReusableInvolved}</b>
                        {componentInfo.componentReusableInvolved === 'Yes' ? (<>
                            <br />Reusable Component Name <br /><b>{componentInfo.componentName}</b>
                            <br />Reusable Component Product Number <br /><b>{componentInfo.componentProductNumber}</b>
                        </>) : null}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="h6">Representative Reporting the Event Information:</Typography>
                        <IconButton onClick={() => history.push('/productinquiry/31')}><EditIcon /></IconButton>
                    </Stack>
                    <Typography fullWidth
                        alignSelf='flex-start'
                        sx={{ margin: 1, fontSize: 'small' }}>
                        {repReportingInfo.repReportingBool ? (<>
                            Rep&apos;s Name: <br /> <b>{repReportingInfo.repName}</b>
                            <br />Company Name: <br /> <b>{repReportingInfo.repCompanyName}</b>
                            <br />Contact Info: <br /> <b>{repReportingInfo.repContactInfo}</b>
                            <br />Was representative present during event? <br /><b>{repReportingInfo.repPresent}</b>
                            <br />Event Communicated to Rep via: <br /> <b>{repReportingInfo.repCommunicatedMethod}</b>
                            {repReportingInfo.repCommunicatedMethod === 'other' ? (<>
                                <br />Other Communication Details: <br /> <b>{repReportingInfo.repOtherDescription}</b>
                            </>) : null}
                            <br />Date the event was reported to the rep, if different than the date the event occurred: <br /><b>{repReportingInfo.repDateReportedBy}</b>
                            <br />Date the event was reported to ThermaSolutions, if different than the date the event occurred: <br /><b>{repReportingInfo.repDateReportedToTherma}</b>
                        </>) : null}
                    </Typography>
                </Grid>

                {imageurl.length > 0 ? (<>
                    <Grid item xs={12}>
                        <Stack direction='column' justifyContent='space-between' alignItems='center'>
                            <Typography variant="h6">Uploaded Media</Typography>
                            <img src={imageurl} width="350px" alt='uploaded image' />
                        </Stack>
                    </Grid>
                </>) : null}
            </Grid>
            <Stack>
                <Button onClick={submitSummary} sx={{ margin: 2 }} color='primary' variant='contained'> Submit </Button>
            </Stack>
        </>
    )
}

export default PI_Summary