import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Stack,
    Box,
    Typography
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const AdminTable = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const productInquiries = useSelector(store => store.allProductInquiries);
    const productFeedback = useSelector(store => store.adminProductFeedback);
    const rows = Array.isArray(productInquiries) ? [...productInquiries] : [];
    const rows2 = Array.isArray(productFeedback) ? [...productFeedback] : [];


    useEffect(() => {
        dispatch({type: 'GET_ALL_PRODUCT_INQUIRIES'});
        dispatch({type: 'FETCH_PRODUCT_FEEDBACK'});
    }, [])

    return (
        <Stack direction="direction" gap="40px">
            <Box width="100%">
                <Typography variant="h4" textAlign="center" mb="20px">Inquiries</Typography>
                <TableContainer elevation={6} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="left">Inquiry Number</TableCell>
                                <TableCell align="left">Hospital</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows[0] && rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {new Date(row.event.eventDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="left">{row.id}</TableCell>
                                    <TableCell align="left">{row.hospital.hospitalName}</TableCell>
                                    <TableCell align="left">{row.completed === true ? <span style={{color: 'green'}}>Complete</span> : <span style={{color: '#AC0B38'}}>Incomplete</span>}</TableCell>
                                    <TableCell align="left">
                                        <IconButton onClick={() => history.push(`/details/${row.id}`)}>
                                            <OpenInNewIcon></OpenInNewIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box width="100%">
                <Typography variant="h4" textAlign="center" mb="20px">Feedback</Typography>
                <TableContainer elevation={6} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="left">Feedback ID</TableCell>
                                <TableCell align="left">Hospital</TableCell>
                                <TableCell align="left">Clinician Name</TableCell>
                                <TableCell align="left">Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows2[0] && rows2.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {new Date(row.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="left">{row.id}</TableCell>
                                    <TableCell align="left">{row.hospital_name}</TableCell>
                                    <TableCell align="left">{row.clinician_name}</TableCell>
                                    <TableCell align="left">
                                        <IconButton onClick={() => history.push(`/feedback/${row.id}`)}>
                                            <OpenInNewIcon></OpenInNewIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Stack>     
    );
};


export default AdminTable;
