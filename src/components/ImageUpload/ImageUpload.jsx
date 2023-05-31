import { Typography, Button, Stack} from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// TODO: add snackbar or some sort of success message for image upload, potentially remove ability to upload after an image is added.
// TODO: Temp storage of image, not to be submitted to AWS until whole form is confirmed.

const ImageUpload = ({nextString, backString}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [file, setFile] = useState();
    const [imageName, setImageName] = useState();

    const fileInputRef = useRef(null);

    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        // Simulate a delay of 0.5 seconds before updating the progress
        const delay = 500;
        const timer = setTimeout(() => {
            setProgressValue(89);
        }, delay);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    const handleFileUpload = () => {
        fileInputRef.current.click();
    };
    console.log(file);

    const submitImage = async (event) => {
        event.preventDefault();

        // Send the file and description to the server
        const formData = new FormData();
        formData.append('image', file);

        const result = await axios.post('/api/images', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(result.data);
        setImageName(result.data);
        dispatch({type: 'SET_IMAGE_URL', payload: result.data})
    };

    return (
        <Stack justifyContent="space-between" height="100%">
            <center>
                <br />
                <div className='pi-header'>
                    <Typography variant='h5'>Add An Image</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <progress max="100" min="2" value={progressValue} data-label="Progress..."></progress>
                </div>
                <br />
                <form onSubmit={submitImage}>
                    <input
                        filename={file}
                        ref={fileInputRef}
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        accept="image/*"
                        style={{display: 'none'}}
                    ></input>
                    <Stack direction="row" width="80%" justifyContent="space-between" mb="20px">
                        <Button variant="contained" color="primary" onClick={handleFileUpload}>
                            Upload File
                        </Button>
                        <Button variant="contained" type="submit">Submit</Button>
                    </Stack>
                    {file && (<Typography mb="40px">{file.name}</Typography>)}
                </form>
                {imageName && (
                    <div>
                        <div className='pi-header'>
                            <Typography variant='h5' mb="20px">Uploaded Image</Typography>
                        </div>
                        <img style={{ height: '300px' }} src={imageName} alt="Uploaded image" />
                    </div>
                )}
            </center>

            {/* update history.push for correct routes */}
            <div className='ButtonContainer' style={{marginBottom:'20px'}}>
                <Button onClick={() => history.push(`${backString}`)} sx={{ margin: 2 }} color='secondary' variant='contained'>Back</Button>
                <Button onClick={() => history.push(`${nextString}`)} sx={{ margin: 2 }} variant='contained'>Next</Button>
            </div>
        </Stack>
    )
}

export default ImageUpload;