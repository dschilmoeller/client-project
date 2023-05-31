const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * GET route
 */
router.get('/:serial', (req, res) => {
    const serialToGet = req.params.serial;
    const sqlText = `
      SELECT "id",
      "Hospital",
      "Street",
      "City",
      "State",
      "Country",
      "Zip",
      "Group",
      "Component Tray" as "ComponentTray",
      "Serial Number" as "SerialNumber",
      "SOS Account Name" as "AccountName",
      "Crate Accessories" as "CrateAccessories",
      "GMG Primary" as "GMGPrimary",
      "Crate and Notes" as "CrateAndNotes",
      "Contact Information" as "ContactInformation"      
      FROM "device_data" WHERE "Serial Number" = $1
    ;`;

    pool
        .query(sqlText, [serialToGet])
        .then((response) => {
            if (response.rows[0]) {
                res.send(response.rows);
                console.log('successfual get request in device router with serial number:', serialToGet);
            }
        })
        .catch((err) => {
            console.log('Error in device.router get request:', err);
            res.sendStatus(500);
        });
});

module.exports = router;
