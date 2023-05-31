import { Box, AppBar, Toolbar, Stack, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AdminNav.css';

const AdminNav = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);

    return (
        <>
            <Box>
                <AppBar position="static" sx={{ bgcolor: '#cc053c' }} elevation={6}>
                    <Toolbar disableGutters={true}>
                        <Stack direction="row" justifyContent="flex-start" width="100%">
                            <img
                                className="logo"
                                src="./images/ThermaSolutions-Logo-300.jpg"
                            />
                        </Stack>
                        {user.access_level === 1 ? (
                            <Stack mr="20px" direction="row" gap="20px">
                                <Button
                                    variant="text"
                                    sx={{ color: 'white' }}
                                    onClick={() => history.push('/admin')}
                                >
                                  Dashboard
                                </Button>
                                <Button
                                    variant="text"
                                    sx={{ color: 'white' }}
                                    onClick={() => dispatch({ type: 'LOGOUT' })}
                                >
                                  Logout
                                </Button>
                            </Stack>
                        ) : (
                            <div></div>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default AdminNav;
