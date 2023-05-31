import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button, TextField, Typography, Stack } from '@mui/material';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector((store) => store.errors);
    const dispatch = useDispatch();

    const login = (event) => {
        event.preventDefault();

        if (username && password) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    username: username,
                    password: password,
                },
            });
        } else {
            dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    }; // end login

    return (
        <form className="formPanel" onSubmit={login}>
            <Typography variant="h4" mb="20px">
        Login
            </Typography>
            {errors.loginMessage && (
                <h3 className="alert" role="alert">
                    {errors.loginMessage}
                </h3>
            )}
            <Stack gap="20px" mb="20px" width="200px">
                <TextField
                    type="text"
                    required
                    value={username}
                    label="Username"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                    type="password"
                    required
                    value={password}
                    label="Password"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </Stack>
            <div>
                <Button variant="contained" type="submit">
          Log In
                </Button>
            </div>
        </form>
    );
}

export default LoginForm;
