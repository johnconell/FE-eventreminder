import React, { useState, useCallback } from 'react';
import { Box, Paper, TextField, Button, Typography, Snackbar, Alert, IconButton, InputAdornment, Backdrop, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './fonts/fonts.css';
import api from './api';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(false); // State to track loading status
    const navigate = useNavigate();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setSnackbarMessage('All fields are required');
            setSnackbarSeverity('error');
            setOpen(true);
            return;
        }

        if (password !== confirmPassword) {
            setSnackbarMessage('Passwords do not match');
            setSnackbarSeverity('error');
            setOpen(true);
            return;
        }

        setLoading(true); // Show the loading backdrop

        try {
            const response = await api.post('/register', {
                name,
                email,
                password,
            });

            localStorage.setItem('auth_token', response.data.token);

            console.log('Registration successful', response.data);
            setSnackbarMessage('Registration successful!');
            setSnackbarSeverity('success');
            setOpen(true);

            setTimeout(() => {
                setLoading(false); // Hide the loading backdrop
                navigate('/users');
            }, 2000);
        } catch (error) {
            console.error('There was an error registering!', error);
            setSnackbarMessage('Registration failed. Please try again.');
            setSnackbarSeverity('error');
            setOpen(true);
            setLoading(false); // Hide the loading backdrop
        }
    }, [name, email, password, confirmPassword, navigate]);

    const handleClose = useCallback((event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }, []);

    return (
        <Box 
            sx={{
                display: 'flex', 
                height: '100vh', 
                width: '100%', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundImage: 'url(images/images3.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Paper elevation={10} sx={{ padding: '30px', width: '390px' }}>
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <Typography sx={{ fontFamily: 'Poppins-Bold', fontSize: '30px' }}>Sign up</Typography>
                        <Typography sx={{ marginRight: '20px', fontFamily: 'HostGrotesk-SemiBold', color: '#a8326d' }}>Event Reminder</Typography>
                    </Box>

                    <TextField 
                        label="Full Name"
                        variant="outlined"
                        margin="normal"
                        size='medium'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <TextField 
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        size='medium'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />

                    <TextField 
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        size='medium'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleTogglePasswordVisibility}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField 
                        label="Confirm Password"
                        variant="outlined"
                        margin="normal"
                        size='medium'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleTogglePasswordVisibility}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Typography sx={{ fontSize: '13px', color: '#616060', padding: '10px'}}>
                        By completing your registration, you agree to adhere to Event Reminder's policies.
                    </Typography>

                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>

                    <Button type="submit" size='large' variant='contained' sx={{ backgroundColor: '#a8326d' }}>REGISTER</Button>
                </form>
            </Paper>
        </Box>
    );
}

export default Signup;
