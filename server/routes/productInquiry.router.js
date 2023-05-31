const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/all', rejectUnauthenticated, (req, res) => {
    console.log('in pi /all request')
    const queryText = `
        SELECT *
        FROM "incident"
        ORDER BY "completed" ASC, ("event"->>'date')::date;
   `;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error in productInquiry get request:', error);
            res.sendStatus(500);
        })
});


/**
* GET pi by id
*/
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const idToGet = req.params.id;
    const queryText = `
        SELECT * FROM "incident" WHERE "id" = $1;
   `;
    pool.query(queryText, [idToGet])
        .then(result => {
            console.log('Successful get request for product inquiry with id:', idToGet)
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error in productInquiry get request:', error);
            res.sendStatus(500);
        })
});


/**
* POST route
*/
router.post('/', (req, res) => {
    const PIData = req.body;
    const queryText = `
        INSERT INTO "incident" ("hospital", "event", "device", "patient", "disposable", "component", "rep", "image_url")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8 );
 `;
    const queryArr = [PIData.hospitalInfo, PIData.eventInfo, PIData.deviceInfo, PIData.patientInfo, PIData.disposableInfo, PIData.componentInfo, PIData.repReportingInfo, PIData.imageurl];
    pool.query(queryText, queryArr)
        .then(result => {
            console.log('Successfully added new product inquiry data.')
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error in productInquiry POST request', error);
            res.sendStatus(500);
        })
});


// PUT Request
router.put('/', rejectUnauthenticated, (req, res) => {
    const PIData = req.body;
    const idToUpdate = req.body.id;
    console.log('req.body in product inquiry PUT request:', PIData);
    const queryText = `
        UPDATE "incident"
        SET "investigation" = $1,
        "risk_analysis" = $2,
        "actions_taken" = $3,
        "complaint_reportable" = $4,
        "prepared_by" = $5
        WHERE "id" = $6;
 `;
    const queryArr = [PIData.investigation, PIData.riskAnalysis, PIData.actionsTaken, PIData.complaintReportable, PIData.preparedBy, idToUpdate];
    pool.query(queryText, queryArr)
        .then(result => {
            console.log('Successfully update product inquiry data.')
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error in productInquiry PUT request', error);
            res.sendStatus(500);
        })
});

// Update form status
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const idToUpdate = req.params.id;
    const status = req.body.status;
    const queryText = `
        UPDATE "incident"
        SET "completed" = $1
        WHERE "id" = $2;
    `;
    const queryArr = [status, idToUpdate];
    pool.query(queryText, queryArr)
        .then(result => {
            console.log('updated PI form status');
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error updating PI form status', error);
            res.sendStatus(500);
        })
});

module.exports = router;
