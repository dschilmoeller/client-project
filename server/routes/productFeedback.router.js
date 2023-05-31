const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// CREATE - POST
router.post('/', (req, res) => {
    console.log('req.body:', req.body);
    let rb = req.body;
    // TEST QUERY
    let sqlQuery = `INSERT INTO "feedback" (hospital_name, clinician_name, clinician_email, clinician_phone, comment)
  VALUES($1, $2, $3, $4, $5)`;
    //EDIT!
    let queryValues = [
        rb.feedbackHospitalName,
        rb.feedbackClinicianName,
        rb.feedbackClinicianEmail,
        rb.feedbackClinicianPhone,
        rb.feedbackComment,
    ];

    pool
        .query(sqlQuery, queryValues)
        .then((response) => res.sendStatus(201))
        .catch((err) => {
            console.log('err:', err);
            res.sendStatus(500);
        });
});

//  READ - GET
router.get('/', rejectUnauthenticated, (req, res) => {

    let sqlQuery = `
        SELECT *
        FROM "feedback"
        ORDER BY "date" DESC;
    `;

    pool
        .query(sqlQuery)
        .then((response) => res.send(response.rows))
        .catch((err) => res.sendStatus(500));
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const idTogGet = req.params.id;
    const sqlQuery = `
    SELECT * FROM "feedback" WHERE "id" = $1;
`;
    pool
        .query(sqlQuery, [idTogGet])
        .then((response) => res.send(response.rows))
        .catch((err) => res.sendStatus(500));
});

module.exports = router;
