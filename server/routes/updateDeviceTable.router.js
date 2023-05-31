const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Configure multer to save .csv file to correct folder -./server/csv
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './server/csv'); // Upload inside csv folder in server folder
    } ,
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-')+ '-' + file.originalname);
    } //create new file name to reference
});

// upload csv file to fileStorage via multer
const upload = multer({ storage: fileStorage });

/**
* POST route
*/
router.post('/', rejectUnauthenticated, upload.single('csv'), async (req, res) => {
   
    // Access the uploaded file via req.file
    // console.log('req.file', req.file);
    if (!req.file) {
        // console.log('err:', err);
        return res.status(400);
    }
   
    const filePath = path.resolve(req.file.path);

    const records = [];
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => records.push(data))
        .on('end', async () => {
            try {
                const client = await pool.connect();
                await client.query('BEGIN');

                const queryDropTable = 'DROP TABLE IF EXISTS "device_data"';
                const queryCreateTable = `CREATE TABLE "device_data" 
                    ("id" SERIAL PRIMARY KEY,
                    "SOS Account Name" VARCHAR (200),
                    "Hospital" VARCHAR (200),
                    "Street" VARCHAR (300),
                    "City" VARCHAR (100),
                    "State" VARCHAR (100),
                    "Country" VARCHAR (100),
                    "Zip" VARCHAR (100),
                    "Component Tray" VARCHAR (100),
                    "Serial Number" VARCHAR (100),
                    "Crate Accessories" VARCHAR (100),
                    "Group" VARCHAR (100),
                    "Crate and Notes" VARCHAR (1000),
                    "GMG Primary" VARCHAR (100),
                    "Contact Information" VARCHAR (1000))`;

                await client.query(queryDropTable);
                await client.query(queryCreateTable);

                for(let record of records) {
                    let insertQuery = 'INSERT INTO device_data ("SOS Account Name", "Hospital", "Street", "City", "State", "Country", "Zip", "Component Tray", "Serial Number", "Crate Accessories", "Group", "Crate and Notes", "GMG Primary", "Contact Information") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
                    await client.query(insertQuery, Object.values(record));
                }

                await client.query('COMMIT');
                client.release();

                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        res.status(500).send('Server Error');
                    } else {
                        res.sendStatus(200);
                    }
                });
            } catch (e) {
                console.error('Database error:', e);
                res.status(500).send('Server Error');
            }
        });
});

module.exports = router;
