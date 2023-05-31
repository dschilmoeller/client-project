import { Button } from '@mui/material';
const Docxtemplater = require('docxtemplater');
import templateContent from './LongFormTemplate.docx'
import JSZipUtils from 'jszip-utils';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';

const DocxSaveButton = () => {
    const PIData = useSelector(store => store.piSummaryInfo);
    console.log(PIData);

    const generateBox = (string) => {
        if (string === 'Yes' || string === true) {
            return '\u2611'
        }
        if (string === 'No' || string === false) {
            return '\u2610'
        }
    }

    const generateYesNoString = (string) => {
        if (string === 'Yes' || string === true) {
            return 'Yes \u2611 No \u2610'
        }
        if (string === 'No' || string === false) {
            return 'Yes \u2610 No \u2611'
        }
        if (string === '') {
            return 'Yes \u2610 No \u2610'
        }
    }

    const generateYesNoUnkownString = (string) => {
        if (string === 'Yes') {
            return 'Yes \u2611 No \u2610 Unkown \u2610'
        }
        if (string === 'No') {
            return 'Yes \u2610 No \u2611 Unkown \u2610'
        }
        if (string === 'Unkown') {
            return 'Yes \u2610 No \u2610 Unkown \u2611'
        }
        if (string === '') {
            return 'Yes \u2610 No \u2610 Unkown \u2610'
        }
    }
    
    const generateYesNoNaString = (string) => {
        if (string === 'Yes') {
            return 'Yes \u2611 No \u2610 Unkown \u2610'
        }
        if (string === 'No') {
            return 'Yes \u2610 No \u2611 Unkown \u2610'
        }
        if (string === 'Not Applicable') {
            return 'Yes \u2610 No \u2610 N/A \u2611'
        }
        if (string === '') {
            return 'Yes \u2610 No \u2610 N/A \u2610'
        }
    }

    const generateDeviceTempString = (string) => {
        if (string === true) {
            return '\u2611 Temporary Malfunction \u2610 Other?'
        }
        if (string === false) {
            return '\u2610 Temporary Malfunction \u2611 Other?'
        }
        if (string === '') {
            return '\u2610 Temporary Malfunction \u2610 Other?'
        }
    }

    const generateRepCommunicatedString = (string) => {
        if (string === 'teletext') {
            return '\u2611 telephone/text \u2610 email/letter \u2610 in person \u2610 other'
        }
        if (string === 'emailletter') {
            return '\u2610 telephone/text \u2611 email/letter \u2610 in person \u2610 other'
        }
        if (string === 'inperson') {
            return '\u2610 telephone/text \u2610 email/letter \u2611 in person \u2610 other'
        }
        if (string === 'other') {
            return '\u2610 telephone/text \u2610 email/letter \u2610 in person \u2611 other'
        }
        if (string === '') {
            return '\u2610 telephone/text \u2610 email/letter \u2610 in person \u2610 other'
        }
    }

    const generateRiskAnalysisString = (string) => {
        if (string === 'Acceptable') {
            return '\u2611 Acceptable \u2610 Further investigation required \u2610 Not Acceptable'
        }
        if (string === 'Further investigation required') {
            return '\u2610 Acceptable \u2611 Further investigation required \u2610 Not Acceptable'
        }
        if (string === 'Not Acceptable') {
            return '\u2610 Acceptable \u2610 Further investigation required \u2611 Not Acceptable'
        }
        if (string === '') {
            return '\u2610 Acceptable \u2610 Further investigation required \u2610 Not Acceptable'
        }
    }

    const generateCapaStatus = (string) => {
        if (string === 'new') {
            return '\u2611 new \u2610 existing';
        }
        if (string === 'existing') {
            return '\u2610 new \u2611 existing'
        }
        if (string === '') {
            return '\u2610 new \u2610 existing'
        }
    }

    const reformatedPIData = {
        completed: PIData.completed,
        id: PIData.id,
        ...PIData.actions_taken,
        ...PIData.complaint_reportable,
        ...PIData.component,
        ...PIData.device,
        ...PIData.disposable,
        ...PIData.event,
        ...PIData.hospital,
        ...PIData.investigation,
        ...PIData.patient,
        ...PIData.patient,
        ...PIData.prepared_by,
        ...PIData.rep,
        ...PIData.risk_analysis,
    }

    // reformate values to checkboxes by section
    reformatedPIData.hospitalTraning = generateYesNoNaString(reformatedPIData.hospitalTraining);
    // event
    reformatedPIData.eventAllegeCaused = generateYesNoUnkownString(reformatedPIData.eventAllegeCaused);
    reformatedPIData.eventBodyInformed = generateYesNoUnkownString(reformatedPIData.eventBodyInformed);
    //patient
    reformatedPIData.patientImpacted = generateBox(reformatedPIData.patientImpacted);
    reformatedPIData.patientAdverseConsequences = generateYesNoUnkownString(reformatedPIData.patientAdverseConsequences);
    // disposable
    reformatedPIData.disposableSterileKitInvolved = generateYesNoUnkownString(reformatedPIData.disposableSterileKitInvolved);
    reformatedPIData.disposableReplacementUsed = generateYesNoUnkownString(reformatedPIData.disposableReplacementUsed);
    // device
    reformatedPIData.deviceThermoChemInvolved = generateYesNoUnkownString(reformatedPIData.deviceThermoChemInvolved);
    reformatedPIData.deviceTempMalfunctionBool = generateDeviceTempString(reformatedPIData.deviceTempMalfunctionBool);
    reformatedPIData.deviceToBeReturnedBool = generateYesNoString(reformatedPIData.deviceToBeReturnedBool);
    reformatedPIData.deviceReusedBool = generateYesNoString(reformatedPIData.deviceReusedBool);
    reformatedPIData.deviceReplacementUsed = generateYesNoUnkownString(reformatedPIData.deviceReplacementUsed);
    // component
    reformatedPIData.componentReusableInvolved = generateYesNoUnkownString(reformatedPIData.componentReusableInvolved);
    // rep
    reformatedPIData.repPresent = generateYesNoNaString(reformatedPIData.repPresent);
    reformatedPIData.repCommunicatedMethod = generateRepCommunicatedString(reformatedPIData.repCommunicatedMethod);
    // investigation
    reformatedPIData.invDurability = generateBox(reformatedPIData.invDurability);
    reformatedPIData.invFunctionality = generateBox(reformatedPIData.invFunctionality);
    reformatedPIData.invSafety = generateBox(reformatedPIData.invSafety);
    reformatedPIData.invEffectiveness = generateBox(reformatedPIData.invEffectiveness);
    reformatedPIData.invPerformance = generateBox(reformatedPIData.invPerformance);
    reformatedPIData.invIdentification = generateBox(reformatedPIData.invIdentification);
    reformatedPIData.invOther = generateBox(reformatedPIData.invOther);
    // risk analysis
    reformatedPIData.riskAnalysisLevel = generateRiskAnalysisString(reformatedPIData.riskAnalysisLevel);
    // actions taken 
    reformatedPIData.actionCorrectionRequired = generateYesNoString(reformatedPIData.actionCorrectionRequired);
    reformatedPIData.actionMitigatedBool = generateYesNoString(reformatedPIData.actionMitigatedBool);
    reformatedPIData.actionServiceRequiredBool = generateYesNoString(reformatedPIData.actionServiceRequiredBool);
    reformatedPIData.actionServiceMitigatedBool = generateYesNoString(reformatedPIData.actionServiceMitigatedBool);

    reformatedPIData.actionCAPAStatus = generateCapaStatus(reformatedPIData.actionCAPAStatus);
    reformatedPIData.actionCAPARequired = reformatedPIData.actionCAPARequired === 'Yes' ? 'Yes \u2611' : 'Yes \u2610';
    reformatedPIData.actionCAPAExplanation = reformatedPIData.actionCAPAExplanation === '' ? 'No \u2610, explanation:' : `No \u2611, explanation: ${reformatedPIData.actionCAPAExplanation}`;
    // reportable
    reformatedPIData.reportable5Applicable = generateBox(reformatedPIData.reportable5Applicable);
    reformatedPIData.reportable30Applicable = generateBox(reformatedPIData.reportable30Applicable);


    console.log('reformated PI Data:',reformatedPIData);

    // Test output for checked boxes
    // console.log(generateYesNoNaString('na'));

    const generateDocx = () => {
    // Create a new Docxtemplater instance
        const doc = new Docxtemplater();

        // Load the template asynchronously using JSZipUtils
        JSZipUtils.getBinaryContent(templateContent, (error, content) => {
            if (error) {
                throw new Error('Error loading template: ' + error);
            }

            // Load the template content
            const zip = new JSZip(content);
            doc.loadZip(zip);

            // Replace this data with data from database
            const data = reformatedPIData;

            // Bind the data to the template
            doc.setData(data);

            // Generate the document
            try {
                doc.render();
            } catch (error) {
                throw new Error('Error rendering template: ' + error);
            }

            // Get the generated document as an ArrayBuffer
            const buffer = doc.getZip().generate({ type: 'arraybuffer' });
 
            // Convert the ArrayBuffer to a Blob
            const generatedContent = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });

            // Save the generated document using file-saver, change file name to reflect pi #
            const outputFileName = `productInquiryForm${PIData.id}.docx`;
            saveAs(generatedContent, outputFileName);

            console.log('Document created successfully');
        });
    };

    return (
        <div>
            <Button variant="contained" onClick={generateDocx}>Save Docx</Button>
        </div>
    )
}

export default DocxSaveButton;