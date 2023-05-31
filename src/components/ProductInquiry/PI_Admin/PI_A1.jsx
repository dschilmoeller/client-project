import AdminNav from '../../AdminNav/AdminNav';
import {
    Typography, Accordion, AccordionSummary, AccordionDetails,
    TextField, Stack, FormGroup, FormControlLabel, Checkbox, FormLabel, 
    FormControl, Radio, RadioGroup, Button, InputLabel, Select, MenuItem, Snackbar, Box
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import DocxSaveButton from './DocxSaveButton';

const ProductInquiry_A1 = () => {
    const dispatch = useDispatch();
    const { id: productInquiryID } = useParams();
    const piSummary = useSelector((store) => store.piSummaryInfo);

    // on page load grab id from url and fetch details
    useEffect(() => {
        dispatch({
            type: 'GET_PRODUCT_INQUIRY_SUMMARY',
            payload: { id: productInquiryID },
        });
    }, []);
    // run this when piSummary changes and set state with values from database
    useEffect(() => {
        if (piSummary.investigation) {
            setInvestigation(piSummary.investigation);
            setRiskAnalysis(piSummary.risk_analysis);
            setActionsTaken(piSummary.actions_taken);
            setComplaintReportable(piSummary.complaint_reportable);
            setPreparedBy(piSummary.prepared_by);
        }
    }, [piSummary]);

    // initial state of each section is an object
    const [investigation, setInvestigation] = useState({});
    const [riskAnalysis, setRiskAnalysis] = useState({});
    const [actionsTaken, setActionsTaken] = useState({});
    const [complaintReportable, setComplaintReportable] = useState({});
    const [preparedBy, setPreparedBy] = useState({});
    // state to control snackbar
    const [open, setOpen] = useState(false);
    // custom alert component from MUI
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // handle changes to inputs in section 2 (investigation)
    const handleSec2Change = (e, property) => {
        console.log('event happened:', property, e.target.value);
        //update the object with new value
        setInvestigation({ ...investigation, [property]: e.target.value });
        console.log(investigation);
    };
    // handle changes to inputs in section 2 checkboxes (investigation)
    const handleSec2CheckChange = (e, property) => {
        console.log('event happened:', property, e.target.checked);
        //update the object with new value
        setInvestigation({ ...investigation, [property]: e.target.checked });
        console.log(investigation);
    };
    // handle changes to inputs in section 3 (risk analysis)
    const handleSec3Change = (e, property) => {
        console.log('event happened:', property, e.target.value);
        //update the object with new value
        setRiskAnalysis({ ...riskAnalysis, [property]: e.target.value });
        console.log(riskAnalysis);
    };
    // handle changes to inputs in section 4 (actions taken)
    const handleSec4Change = (e, property) => {
        console.log('event happened:', property, e.target.value);
        //update the object with new value
        setActionsTaken({ ...actionsTaken, [property]: e.target.value });
        console.log(actionsTaken);
    };
    // handle changes to inputs in section 5 (complaint reportable)
    const handleSec5Change = (e, property) => {
        console.log('event happened:', property, e.target.value);
        //update the object with new value
        setComplaintReportable({ ...complaintReportable, [property]: e.target.value });
        console.log(complaintReportable);
    };
    // handle changes to inputs in section 5 checkboxes (complaint reportable)
    const handleSec5CheckChange = (e, property) => {
        console.log('event happened:', property, e.target.checked);
        //update the object with new value
        setComplaintReportable({ ...complaintReportable, [property]: e.target.checked });
        console.log(complaintReportable);
    };
    // handle changes to inputs in section 6 (prepared by reportable)
    const handleSec6Change = (e, property) => {
        console.log('event happened:', property, e.target.value);
        //update the object with new value
        setPreparedBy({ ...preparedBy, [property]: e.target.value });
        console.log(preparedBy);
    };

    const handleSubmit = () => {
        // show snackbar
        setOpen(true);
        dispatch({
            type: 'UPDATE_PRODUCT_INQUIRY',
            payload: { id: productInquiryID, investigation, riskAnalysis, actionsTaken, complaintReportable, preparedBy },
        });
    }

    // update complete status for form
    const handleComplete = () => {
        dispatch({
            type: 'UPDATE_FORM_STATUS',
            payload: {
                status: !piSummary.completed,
                id: productInquiryID,
            }
        });
    }

    return (
        <>
            <AdminNav />
            <div className='adminPageWrapper'>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }} mb="20px">
                    {piSummary.completed ?
                        <Button onClick={handleComplete} variant='contained'>MARK INCOMPLETE</Button> :
                        <Button onClick={handleComplete} variant='contained' color='success'>MARK COMPLETE</Button>
                    }
                    <DocxSaveButton />
                </Stack>
                <Accordion disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="short-form-content"
                        id="short-form-header"
                    >
                        <Typography variant="h4">Short Form</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6">
                            {piSummary?.hospital &&
                                <div>
                                    Hospital Name: <b>{piSummary.hospital.hospitalName}</b>
                                    <br />Clinician Name: <b>{piSummary.hospital.hospitalClinicianName}</b>
                                    <br />Hospital Address: <b>{piSummary.hospital.hospitalAddress}</b>
                                    <br />Country: <b>{piSummary.hospital.hospitalCountry}</b>
                                    <br />Staff Completed Training? <b>{piSummary.hospital.hospitalTraining}</b>
                                </div>
                            }
                            {piSummary?.event &&
                                <div>
                                    <br />Reporter Name: <b>{piSummary.event.eventReporterName}</b>
                                    <br />Reporter Title: <b>{piSummary.event.eventTitle}</b>
                                    <br />Event Details: <b>{piSummary.event.eventDetails}</b>
                                    <br />Date Event Occurred: <b>{piSummary.event.eventDate}</b>
                                    <br />Physician alleges event was caused by device? <b>{piSummary.event.eventAllegeCaused}</b>
                                    <br />Was a governing body informed of event? <b>{piSummary.event.eventBodyInformed}</b>
                                </div>
                            }
                            {piSummary?.patient &&
                                <div>
                                    <br />Patient Identifier: <b>{piSummary.patient.patientIdentifier}</b>
                                    <br />Patient Age: <b>{piSummary.patient.patientAge}</b>
                                    <br />Patient Sex: <b>{piSummary.patient.patientSex}</b>
                                    <br />Patient Weight: <b>{piSummary.patient.patientWeight}</b>
                                    <br />Patient Condition: <b>{piSummary.patient.patientCondition}</b>
                                    <br />Did the patient experience adverse consqeunces? <br /><b>{piSummary.patient.patientAdverseConsequences}</b>
                                </div>
                            }
                            {piSummary?.disposable &&
                                <div>
                                    <br />Did the event involve a sterile disposable item or kit? <b>{piSummary.disposable.disposableSterileKitInvolved}</b>
                                    <br />Product name: <b>{piSummary.disposable.disposableProductName1}</b>
                                    <br />Product number: <b>{piSummary.disposable.disposableProductNumber1}</b>
                                    <br />Lot number: <b>{piSummary.disposable.disposableLotNumber1}</b>
                                    <br />Expiration Date: <b>{piSummary.disposable.disposableExpirationDate1}</b>
                                    <br />Was a Disposable replacement used? <b>{piSummary.disposable.disposableReplacementUsed}</b>
                                    <br />Replacement device product name: <b>{piSummary.disposable.disposableProductName2}</b>
                                    <br />Replacement device product number: <b>{piSummary.disposable.disposableProductNumber2}</b>
                                </div>
                            }
                            {piSummary?.device &&
                                <div>
                                    <br />Device Model Number: <b>{piSummary.device.deviceModelNumber1}</b>
                                    <br />Device Serial Number: <b>{piSummary.device.deviceSerialNumber1}</b>
                                    <br />Temporary Malfunction? <b>{piSummary.device.deviceTempMalfunctionBool ? ('Yes') : ('No')}</b>
                                    <br />Device to be returned? <b>{piSummary.device.deviceToBeReturnedBool ? ('Yes') : ('No')}</b>
                                    <br />Device to be reused? <b>{piSummary.device.deviceReusedBool ? ('Yes') : ('No')}</b>
                                    <br />Was a replacement device used? <b>{piSummary.device.deviceReplacementUsed}</b>
                                    <br />Replacement Device Model Number: <b>{piSummary.device.deviceModelNumber2}</b>
                                    <br />Replacement Device Serial Number: <b>{piSummary.device.deviceSerialNumber2}</b>
                                </div>
                            }
                            {piSummary?.component &&
                                <div>
                                    <br />Did the Event Inovlve a reusable component? <b>{piSummary.component.componentReusableInvolved}</b>
                                    <br />Reusable Component Name: <b>{piSummary.component.componentName}</b>
                                    <br />Reusable Component Product Number: <b>{piSummary.component.componentProductNumber}</b>
                                </div>
                            }
                            {piSummary?.rep &&
                                <div>
                                    Rep&apos;s Name: <b>{piSummary.rep.repName}</b>
                                    <br />Company Name: <b>{piSummary.rep.repCompanyName}</b>
                                    <br />Contact Info: <b>{piSummary.rep.repContactInfo}</b>
                                    <br />Was representative present during event? <b>{piSummary.rep.repPresent}</b>
                                    <br />Event Communicated to Rep via: <b>{piSummary.rep.repCommunicatedMethod}</b>
                                    <br />Other Communication Details: <b>{piSummary.rep.repOtherDescription}</b>
                                    <br />Date the event was reported to the rep, if different than the date the event occurred: <b>{piSummary.rep.repDateReportedBy}</b>
                                    <br />Date the event was reported to ThermaSolutions, if different than the date the event occurred: <b>{piSummary.rep.repDateReportedToTherma}</b>
                                </div>
                            }
                            {piSummary.image_url ? (<>
                                <Typography variant="h6">Media:</Typography>
                                <img src={piSummary.image_url}></img>
                            </>) : null}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="section2-content"
                        id="section2-header"
                    >
                        <Typography variant="h4">Investigation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <center>
                            <Typography>The following worksheet is to be completed by a ThermaSolutions, Inc. personnel assigned to complete the investigation requirements for the complaint.</Typography>
                        </center>
                        <center>
                            <Box sx={{ width: .8 }}>
                                <Stack direction='column' spacing={2} alignItems='start' sx={{ mb: 2, mt: 2}}>
                                    <TextField
                                        sx={{ backgroundColor: 'white', width: 1, borderRadius: '4px' }}
                                        id='investigationName'
                                        label='Investigator Name:'
                                        type='text'
                                        value={investigation?.investigationName ? investigation.investigationName : ''}
                                        onChange={(e) => handleSec2Change(e, 'investigationName')}
                                    />
                                    <TextField
                                        sx={{ backgroundColor: 'white', width: 1, borderRadius: '4px' }}
                                        id='investigationStartDate'
                                        label='Start date of investigation:'
                                        type='date'
                                        value={investigation?.investigationStartDate ? investigation.investigationStartDate : 'yyyy-mm-dd'}
                                        onChange={(e) => handleSec2Change(e, 'investigationStartDate')}
                                    />
                                </Stack>
                            </Box>
                        </center>
                        <center>
                            <TextField
                                multiline
                                rows={4}
                                sx={{ backgroundColor: 'white', width: .8, mb: 2, borderRadius: '4px' }}
                                id='investigationComments'
                                label='Investigation comments:'
                                value={investigation?.investigationComments ? investigation.investigationComments : ''}
                                onChange={(e) => handleSec2Change(e, 'investigationComments')}
                            />
                        </center>
                        <center>
                            <TextField
                                multiline
                                rows={4}
                                sx={{ backgroundColor: 'white', width: .8, mb: 2, borderRadius: '4px' }}
                                id='investigationRootCause'
                                label='Root Cause:'
                                value={investigation?.investigationRootCause ? investigation.investigationRootCause : ''}
                                onChange={(e) => handleSec2Change(e, 'investigationRootCause')}
                            />
                        </center>
                        <center>
                            <FormGroup sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px' }}>
                                <FormLabel component="event-classification">This event can be classified into the following category: (more than one can be selected)</FormLabel>
                                <Stack direction='row' spacing={2} justifyContent='center'>
                                    <FormControlLabel control={<Checkbox />} label="Durability/Reliability" onChange={(e) => handleSec2CheckChange(e, 'invDurability')}
                                        checked={investigation?.invDurability ? investigation.invDurability : false} />
                                    <FormControlLabel control={<Checkbox />} label="Functionality" onChange={(e) => handleSec2CheckChange(e, 'invFunctionality')}
                                        checked={investigation?.invFunctionality ? investigation.invFunctionality : false} />
                                    <FormControlLabel control={<Checkbox />} label="Safety" onChange={(e) => handleSec2CheckChange(e, 'invSafety')}
                                        checked={investigation?.invSafety ? investigation.invSafety : false} />
                                </Stack>
                                <Stack direction='row' spacing={2} justifyContent='center'>
                                    <FormControlLabel control={<Checkbox />} label="Effectiveness" onChange={(e) => handleSec2CheckChange(e, 'invEffectiveness')}
                                        checked={investigation?.invEffectiveness ? investigation.invEffectiveness : false} />
                                    <FormControlLabel control={<Checkbox />} label="Performance" onChange={(e) => handleSec2CheckChange(e, 'invPerformance')}
                                        checked={investigation?.invPerformance ? investigation.invPerformance : false} />
                                    <FormControlLabel control={<Checkbox />} label="Identification" onChange={(e) => handleSec2CheckChange(e, 'invSafety')}
                                        checked={investigation?.invIdentification ? investigation.invIdentification : false} />
                                </Stack>
                                <center>
                                    <FormControlLabel control={<Checkbox />} label="" onChange={(e) => handleSec2CheckChange(e, 'invOther')}
                                        checked={investigation?.invOther ? investigation.invOther : false} />
                                    <TextField
                                        sx={{ width: .4 }}
                                        variant='standard'
                                        id='invOtherDescription'
                                        label='Other category, explain:'
                                        value={investigation?.invOtherDescription ? investigation.invOtherDescription : ''}
                                        onChange={(e) => handleSec2Change(e, 'invOtherDescription')}
                                    />
                                </center>
                            </FormGroup>
                            <Typography>Complete and return to Product Management or Quality Representative</Typography>
                        </center>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="section3-content"
                        id="section3-header"
                    >
                        <Typography variant="h4">Risk Analysis</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <center>
                            <Typography>To be completed by the Product Management or Quality Representative:</Typography>
                            <br></br>
                            <img src='./images/risk_analysis.png' width='80%' />
                            <br></br>
                            <FormControl variant="filled" sx={{ backgroundColor: 'white', borderRadius: '4px', m: 2, minWidth: 120 }}>
                                <InputLabel id="probability-select-label">Probability</InputLabel>
                                <Select
                                    labelId="probability-select-label"
                                    id="probability-select"
                                    value={riskAnalysis?.probability ? riskAnalysis.probability : ''}
                                    label="Probability"
                                    onChange={(e) => handleSec3Change(e, 'probability')}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" sx={{ backgroundColor: 'white', borderRadius: '4px', m: 2, minWidth: 120 }}>
                                <InputLabel id="severity-select-label">Severity</InputLabel>
                                <Select
                                    labelId="severity-select-label"
                                    id="severity-select"
                                    value={riskAnalysis?.severity ? riskAnalysis.severity : ''}
                                    label="Severity"
                                    onChange={(e) => handleSec3Change(e, 'severity')}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                            <br></br>
                            <FormControl sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px', alignItems: 'center' }}>
                                <FormLabel component="risk-analysis">Risk Analysis</FormLabel>
                                <RadioGroup
                                    aria-labelledby="risk-analysis-radio"
                                    name="radio-buttons-group"
                                    column="true"
                                    value={riskAnalysis?.riskAnalysisLevel ? riskAnalysis.riskAnalysisLevel : ''}
                                    onChange={(e) => handleSec3Change(e, 'riskAnalysisLevel')}
                                >
                                    <FormControlLabel value="Acceptable" control={<Radio />} label="Acceptable" />
                                    <FormControlLabel value="Further investigation required" control={<Radio />} label="Further investigation required" />
                                    <FormControlLabel value="Not Acceptable" control={<Radio />} label="Not Acceptable (not acceptable risk results in CAPA)" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                multiline
                                rows={4}
                                sx={{ backgroundColor: 'white', width: .8, mb: 2, borderRadius: '4px' }}
                                id='riskJustification'
                                label='Justification for Risk Level:'
                                value={riskAnalysis?.riskJustification ? riskAnalysis.riskJustification : ''}
                                onChange={(e) => handleSec3Change(e, 'riskJustification')}
                            />
                        </center>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="section4-content"
                        id="section4-header"
                    >
                        <Typography variant="h4">Actions Taken</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <center>
                            <FormControl sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px', alignItems: 'center' }}>
                                <FormLabel component="actions-taken">Was a correction required?</FormLabel>
                                <RadioGroup
                                    aria-labelledby="actions-taken-radio"
                                    name="radio-buttons-group"
                                    row
                                    value={actionsTaken?.actionCorrectionRequired ? actionsTaken.actionCorrectionRequired : ''}
                                    onChange={(e) => handleSec4Change(e, 'actionCorrectionRequired')}
                                >
                                    <center>
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    </center>
                                </RadioGroup>
                                <TextField
                                    sx={{ width: .5 }}
                                    variant='standard'
                                    id='actionCorrectionDetails'
                                    label='Details:'
                                    value={actionsTaken?.actionCorrectionDetails ? actionsTaken.actionCorrectionDetails : ''}
                                    onChange={(e) => handleSec4Change(e, 'actionCorrectionDetails')}
                                />
                                <br></br>
                                <Typography>(Note: a correction utilizes the current disposable, device or component)</Typography>
                            </FormControl>
                            <FormControl sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px', alignItems: 'center' }}>
                                <FormLabel component="correction-mitigate">Did correction mitigate complaint?</FormLabel>
                                <RadioGroup
                                    aria-labelledby="correction-mitigate-radio"
                                    name="radio-buttons-group"
                                    row
                                    value={actionsTaken?.actionMitigatedBool ? actionsTaken.actionMitigatedBool : ''}
                                    onChange={(e) => handleSec4Change(e, 'actionMitigatedBool')}
                                >
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px', alignItems: 'center' }}>
                                <FormLabel component="service-required">Is service required?</FormLabel>
                                <RadioGroup
                                    aria-labelledby="service-required-radio"
                                    name="radio-buttons-group"
                                    row
                                    value={actionsTaken?.actionServiceRequiredBool ? actionsTaken.actionServiceRequiredBool : ''}
                                    onChange={(e) => handleSec4Change(e, 'actionServiceRequiredBool')}
                                >
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                </RadioGroup>
                                <TextField
                                    sx={{ width: .5 }}
                                    variant='standard'
                                    id='PSO#'
                                    label='PSO#'
                                    value={actionsTaken?.actionPSONum ? actionsTaken.actionPSONum : ''}
                                    onChange={(e) => handleSec4Change(e, 'actionPSONum')}
                                />
                            </FormControl>
                            <FormControl sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px', alignItems: 'center' }}>
                                <FormLabel component="service-mitigate">Did service mitigate complaint?</FormLabel>
                                <RadioGroup
                                    aria-labelledby="service-mitigate-radio"
                                    name="radio-buttons-group"
                                    row
                                    value={actionsTaken?.actionServiceMitigatedBool ? actionsTaken.actionServiceMitigatedBool : ''}
                                    onChange={(e) => handleSec4Change(e, 'actionServiceMitigatedBool')}
                                >
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px', alignItems: 'center' }}>
                                <FormLabel component="CAPA-required">Is Corrective & Preventative Action required?</FormLabel>
                                <RadioGroup
                                    aria-labelledby="CAPA-required-radio"
                                    name="radio-buttons-group"
                                    row
                                    value={actionsTaken?.actionCAPARequired ? actionsTaken.actionCAPARequired : ''}
                                    onChange={(e) => handleSec4Change(e, 'actionCAPARequired')}
                                >
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                </RadioGroup>
                                {actionsTaken?.actionCAPARequired === 'Yes' && (
                                    <>
                                        <TextField
                                            sx={{ width: .3 }}
                                            variant='standard'
                                            id='actionCAPANum'
                                            label='CAPA#'
                                            value={actionsTaken?.actionCAPANum ? actionsTaken.actionCAPANum : ''}
                                            onChange={(e) => handleSec4Change(e, 'actionCAPANum')}
                                        />
                                        <RadioGroup
                                            aria-labelledby="CAPA-status-radio"
                                            name="radio-buttons-group"
                                            row
                                            value={actionsTaken?.actionCAPAStatus ? actionsTaken.actionCAPAStatus : ''}
                                            onChange={(e) => handleSec4Change(e, 'actionCAPAStatus')}
                                        >
                                            <FormControlLabel value="new" control={<Radio />} label="new" />
                                            <FormControlLabel value="existing" control={<Radio />} label="existing" />
                                        </RadioGroup>
                                    </>
                                )}
                                {actionsTaken?.actionCAPARequired === 'No' &&
                                    <TextField
                                        sx={{ width: .3 }}
                                        variant='standard'
                                        id='actionCAPAExplanation'
                                        label='explanation:'
                                        value={actionsTaken?.actionCAPAExplanation ? actionsTaken.actionCAPAExplanation : ''}
                                        onChange={(e) => handleSec4Change(e, 'actionCAPAExplanation')}
                                    />
                                }
                            </FormControl>
                        </center>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="section5-content"
                        id="section5-header"
                    >
                        <Typography variant="h4">Complaint</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <center>
                            <img src='./images/complaint.png' width='80%' />
                            <FormGroup sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px' }}>
                                <FormLabel component="event-classification">FDA action required, refer to SOP 1011. A 5-day MDR to the FDA is required (FDA MEDWATCH FORM 3500A)</FormLabel>
                                <Stack direction='row' spacing={2} justifyContent='center'>
                                    <FormControlLabel control={<Checkbox />} label="Not applicable" onChange={(e) => handleSec5CheckChange(e, 'reportable5Applicable')} />
                                </Stack>
                                <Stack direction='row' spacing={2} justifyContent='center'>
                                    <TextField
                                        sx={{ width: .25 }}
                                        variant='standard'
                                        id='reportable5DueDate'
                                        label='5-Day Due Date:'
                                        value={complaintReportable?.reportable5DueDate ? complaintReportable.reportable5DueDate : ''}
                                        onChange={(e) => handleSec5Change(e, 'reportable5DueDate')}
                                    />
                                    <TextField
                                        sx={{ width: .25 }}
                                        variant='standard'
                                        id='reportable5MDR'
                                        label='MDR #:'
                                        value={complaintReportable?.reportable5MDR ? complaintReportable.reportable5MDR : ''}
                                        onChange={(e) => handleSec5Change(e, 'reportable5MDR')}
                                    />
                                    <TextField
                                        sx={{ width: .25 }}
                                        variant='standard'
                                        id='reportable5Person'
                                        label='Person to file report'
                                        value={complaintReportable?.reportable5Person ? complaintReportable.reportable5Person : ''}
                                        onChange={(e) => handleSec5Change(e, 'reportable5Person')}
                                    />
                                </Stack>
                            </FormGroup>
                            <FormGroup sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px' }}>
                                <FormLabel component="event-classification">FDA action required, refer to SOP 1011. A 30-day MDR to the FDA is required (FDA MEDWATCH FORM 3500A)</FormLabel>
                                <Stack direction='row' spacing={2} justifyContent='center'>
                                    <FormControlLabel control={<Checkbox />} label="Not applicable" onChange={(e) => handleSec5CheckChange(e, 'reportable30Applicable')} />
                                </Stack>
                                <Stack direction='row' spacing={2} justifyContent='center'>
                                    <TextField
                                        sx={{ width: .25 }}
                                        variant='standard'
                                        id='reportable30DueDate'
                                        label='30-Day Due Date:'
                                        value={complaintReportable?.reportable30DueDate ? complaintReportable.reportable30DueDate : ''}
                                        onChange={(e) => handleSec5Change(e, 'reportable30DueDate')}
                                    />
                                    <TextField
                                        sx={{ width: .25 }}
                                        variant='standard'
                                        id='reportable30MDR'
                                        label='MDR #:'
                                        value={complaintReportable?.reportable30MDR ? complaintReportable.reportable30MDR : ''}
                                        onChange={(e) => handleSec5Change(e, 'reportable30MDR')}
                                    />
                                    <TextField
                                        sx={{ width: .25 }}
                                        variant='standard'
                                        id='reportable30Person'
                                        label='Person to file report'
                                        value={complaintReportable?.reportable30Person ? complaintReportable.reportable30Person : ''}
                                        onChange={(e) => handleSec5Change(e, 'reportable30Person')}
                                    />
                                </Stack>
                            </FormGroup>
                            <FormGroup sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px', alignItems: 'center' }}>
                                <FormLabel component="event-classification">If Reports of Corrections and Removals – 21 CFR 806.10, reportable to FDA (Yes or No)</FormLabel>
                                <RadioGroup
                                    aria-labelledby="reportable-FDA1-radio"
                                    name="radio-buttons-group"
                                    row
                                    value={complaintReportable?.reportableFDA1 ? complaintReportable.reportableFDA1 : ''}
                                    onChange={(e) => handleSec5Change(e, 'reportableFDA1')}
                                >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormGroup>
                            <FormGroup sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px', alignItems: 'center' }}>
                                <FormLabel component="event-classification">Corrections and Removals required to be maintained but not required to be reported to FDA - 21 CFR 806.20 (Yes or No)</FormLabel>
                                <RadioGroup
                                    aria-labelledby="reportable-FDA2-radio"
                                    name="radio-buttons-group"
                                    row
                                    value={complaintReportable?.reportableFDA2 ? complaintReportable.reportableFDA2 : ''}
                                    onChange={(e) => handleSec5Change(e, 'reportableFDA2')}
                                >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormGroup>
                            <img src='./images/complaint2.png' width='80%' />
                        </center>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="section6-content"
                        id="section6-header"
                    >
                        <Typography variant="h4">Prepared By</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <center>
                            <FormGroup sx={{ backgroundColor: 'white', width: .8, mb: 2, pb: 2, borderRadius: '4px' }}>
                                <Stack direction='row' spacing={2} justifyContent='center'>
                                    <TextField
                                        sx={{ width: .3 }}
                                        variant='standard'
                                        id='preparedByName'
                                        label='Prepared By:'
                                        value={preparedBy?.preparedByName ? preparedBy.preparedByName : ''}
                                        onChange={(e) => handleSec6Change(e, 'preparedByName')}
                                    />
                                    <TextField
                                        sx={{ width: .3 }}
                                        variant='standard'
                                        id='preparedByPosition'
                                        label='Position:'
                                        value={preparedBy?.preparedByPosition ? preparedBy.preparedByPosition : ''}
                                        onChange={(e) => handleSec6Change(e, 'preparedByPosition')}
                                    />
                                    <TextField
                                        sx={{ width: .3 }}
                                        variant='standard'
                                        id='preparedByDate'
                                        label='Date:'
                                        value={preparedBy?.preparedByDate ? preparedBy.preparedByDate : ''}
                                        onChange={(e) => handleSec6Change(e, 'preparedByDate')}
                                    />
                                </Stack>
                            </FormGroup>
                        </center>
                    </AccordionDetails>
                </Accordion>
                <center>
                    <Button 
                        onClick={handleSubmit} 
                        variant='contained'
                        sx={{ mb: 4, mt: 4 }}
                    >SAVE</Button>
                    {/* show snackbar after clicking SAVE */}
                    <Snackbar
                        open={open}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        autoHideDuration={1500}
                        onClose={() => setOpen(false)}
                    >
                        <Alert severity="success">
                            Form Saved
                        </Alert>
                    </Snackbar>
                </center>
            </div>
        </>
    );
}

export default ProductInquiry_A1;