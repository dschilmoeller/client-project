const piSummaryInfo = (state = {
    investigation: {
        investigationName: '',
        investigationStartDate: '',
        investigationComments: '',
        investigationRootCause: '',
        invDurability: false,
        invFunctionality: false,
        invSafety: false,
        invEffectiveness: false,
        invPerformance: false,
        invIdentification: false,
        invOther: false,
        invOtherDescription: '',
    },
    risk_analysis: {
        probability: '',
        severity: '',
        riskAnalysisLevel: '',
        riskJustification: '',
    },
    actions_taken: {
        actionCorrectionRequired: '',
        actionCorrectionDetails: '',
        actionMitigatedBool: '',
        actionServiceRequiredBool: '',
        actionPSONum: '',
        actionServiceMitigatedBool: '',
        actionCAPARequired: '',
        actionCAPANum: '',
        actionCAPAStatus: '',
        actionCAPAExplanation: '',
    },
    complaint_reportable: {
        reportable5Applicable: false,
        reportable5DueDate: '',
        reportable5MDR: '',
        reportable5Person: '',
        reportable30Applicable: false,
        reportable30DueDate: '',
        reportable30MDR: '',
        reportable30Person: '',
        reportableFDA1: '',
        reportableFDA2: '',
    },
    prepared_by: {
        preparedByName: '',
        preparedByPosition: '',
        preparedByDate: '',
    }
}, action) => {
    if (action.type === 'SET_PI_SUMMARY_INFO') {
        return action.payload
    }
    return state
}

export default piSummaryInfo;