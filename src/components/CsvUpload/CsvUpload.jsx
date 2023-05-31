import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Paper,
    TableContainer,
    Typography,
    Stack,
    Snackbar,
} from '@mui/material';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CsvUpload() {
    const dispatch = useDispatch()
    const csvUploadStatus = useSelector((store) => { store.csvUploadStatus })
    console.log('csvUploadStatus:', csvUploadStatus);
    const [csvUpload, renderCsvUpload] = useState(false);
    const [open, setOpen] = React.useState(false);
  
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
  
        setOpen(false);
    };

    const [csv, setCsv] = useState('');
    // initial value of csvRef - null, no file
    let csvRef = useRef(null);
    // function to update csvRef - after it runs csvRef contains the file selected for upload 
    const handleCsvRef = () => {
        csvRef.current.click();
        const selectedFile = csvRef.current.files[0];
        // console.log('selectedFile:', selectedFile);
        setCsv(selectedFile);
    };
    // console.log(csvRef);

    async function submitCsv(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('csv', csv)
        console.log('formData:', formData);
        dispatch({
            type: 'POST_CSV_UPLOAD',
            payload: formData
        })
        renderCsvUpload(false);
        setCsv('');
        csvRef = null;
        setOpen(true);
    }

    // function cleanUpSuccessfulCsvUpload() {

    // }

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                gap="20px"
            >
                <Button
                    variant='contained'
                    sx={{
                        flexDirection: 'row',
                        // height: '40px',
                        justifySelf: 'flex-end'
                    }}
                    onClick={() => renderCsvUpload(!csvUpload)}>{csvUpload ? 'Abandon Update' : 'Update database'}
                </Button>
                <br />
                {csvUpload && <>
                    {/* <Typography variant="h5">Upload Device Data .csv File</Typography>
                    <br /> */}

                    <form onSubmit={submitCsv}>
                        <input
                            ref={csvRef}
                            onChange={handleCsvRef}
                            type="file"
                            accept='.csv'
                            style={{ display: 'none' }}
                        ></input>
                        <Stack direction="row" justifyContent="space-between" gap="20px">
                            {!csv &&
                                <Button
                                    variant="contained" color="primary"
                                    onClick={handleCsvRef}>
                                    Choose .csv File
                                </Button>}
                            {csv && (<>
                                <Paper sx={{ padding: '6px 15px' }} elevation={6}>
                                    <Typography >{csv.name}</Typography>
                                </Paper>
                                {/* <br /> */}
                                <Button
                                    variant="contained" type="submit">
                                    Submit
                                </Button>

                            </>)}
                        </Stack>
                    </form>
                </>
                }
            </Stack>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully updated database!
                </Alert>
            </Snackbar>
        </>
    );
}

export default CsvUpload;