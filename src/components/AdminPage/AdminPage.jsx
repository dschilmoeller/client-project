import { useState } from 'react';
import {
    Button,
    Typography,
    Box,
    Stack,
    Modal,
    Paper,
    Divider,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import AdminTable from '../AdminTable/AdminTable';
import CsvUpload from '../CsvUpload/CsvUpload';

const AdminPage = () => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userAccessLevel, setUserAccessLevel] = useState('');
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    console.log('user type:', userAccessLevel);

    const createNewUser = () => {
        if (username && password && (userAccessLevel === 0 || userAccessLevel === 1)) {
            let userObj = {
                username,
                password,
                access_level: userAccessLevel
            }

            console.log(userObj);
            dispatch({ type: 'REGISTER', payload: userObj })
            clearState();
            // CHANGE THIS TO USE SNACK LATER
            alert('Successfully added user');
            setOpen(false);
        } else {
            // CHANGE THIS TO USE SNACK LATER
            alert('fill out username, password and select user type');
        }
    }

    const clearState = () => {
        setUsername('');
        setPassword('');
        setUserAccessLevel('');
    }

    return (
        <div>
            <AdminNav />
            <div className="adminPageWrapper">
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb="40px"
                >
                    <Typography variant="h3">Welcome, {user.username}</Typography>
                </Stack>

                <Stack 
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <CsvUpload />
                    <Button
                        variant="contained"
                        // sx={{ height: '40px' }}
                        onClick={() => setOpen(true)}
                    >
                        Add User
                    </Button>
                </Stack>

                <br />
                <Stack direction="row" justifyContent="space-between">

                </Stack>
                <Box mt="20px">
                    <AdminTable />
                </Box>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Paper sx={style}>
                    <Typography id="modal-modal-title" variant="h5" mb="20px">
                        Add User
                    </Typography>
                    <Divider />
                    <Stack gap="20px" width="70%" m="20px 0px">
                        <TextField
                            type="text"
                            required
                            value={username}
                            label="Username"
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <TextField
                            type="text"
                            required
                            value={password}
                            label="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Stack>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                            User Type
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value="admin"
                                control={<Radio />}
                                label="Admin"
                                onClick={() => setUserAccessLevel(1)}
                            />
                            <FormControlLabel
                                value="tech" control={<Radio />}
                                label="Technician"
                                onClick={() => setUserAccessLevel(0)}
                            />
                        </RadioGroup>
                    </FormControl>

                    <Divider />
                    <Stack direction="row" justifyContent="flex-end" mt="20px">
                        <Button variant="contained" width="100px" onClick={createNewUser}>
                            Create User
                        </Button>
                    </Stack>
                </Paper>
            </Modal>
        </div>
    );
};

export default AdminPage;
