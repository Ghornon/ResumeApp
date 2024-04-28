import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { Spinner } from '../components/Spinner';
import { SignUpType } from '../types/SignUp.types';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const SignUp = () => {
    const [user, loading, authStateError] = useAuthState(auth);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        retype: '',
        firstName: '',
        lastName: '',
    });

    const [validationErrors, setValidationErrors] = useState({} as SignUpType);

    const validateForm = () => {
        const validationErrors = {} as SignUpType;

        if (!formData.email.trim()) validationErrors.email = 'Email is required';
        else if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(formData.email))
            validationErrors.email = 'Email is not valid';

        if (!formData.password.trim()) validationErrors.password = 'Password is required';
        else if (formData.password.length < 6)
            validationErrors.password = 'Password should be least 6 char';

        if (!formData.retype.trim()) validationErrors.password = 'Password is required';
        else if (formData.password != formData.retype)
            validationErrors.retype = 'Password do not match';

        if (Object.keys(validationErrors).length) {
            setValidationErrors(validationErrors);
            return false;
        }

        return true;
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password,
            );
            const user = res.user;
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                authProvider: 'local',
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
            });
        } catch (e) {
            const error = e instanceof FirebaseError;
            if (error) {
                setValidationErrors({ ...validationErrors, firebase: e.message });
                if (e.code == 'auth/email-already-in-use')
                    setValidationErrors({ ...validationErrors, email: 'Email already in use' });
                console.error(e.code);
            }
        }
    };

    if (loading) return <Spinner />;

    if (user) return <Navigate to="/dashboard" replace={true} />;

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleChange}
                                    error={validationErrors.firstName ? true : false}
                                    helperText={
                                        validationErrors.firstName ? validationErrors.firstName : ''
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleChange}
                                    error={validationErrors.lastName ? true : false}
                                    helperText={
                                        validationErrors.lastName ? validationErrors.lastName : ''
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    error={validationErrors.email ? true : false}
                                    helperText={
                                        validationErrors.email ? validationErrors.email : ''
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    error={validationErrors.password ? true : false}
                                    helperText={
                                        validationErrors.password ? validationErrors.password : ''
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="retype"
                                    label="Retype password"
                                    type="password"
                                    id="retype"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    error={validationErrors.retype ? true : false}
                                    helperText={
                                        validationErrors.retype ? validationErrors.retype : ''
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <Typography component="p" color="text.secondary" align="center">
                                or sign up with:
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <IconButton color="primary" aria-label="Sign in with Google account">
                                <GoogleIcon />
                            </IconButton>

                            <IconButton color="primary" aria-label="Sign in with GitHub account">
                                <GitHubIcon />
                            </IconButton>

                            <IconButton color="primary" aria-label="Sign in with Microsoft account">
                                <MicrosoftIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    {validationErrors.firebase ? (
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <Alert severity="error">{validationErrors.firebase}</Alert>
                        </Box>
                    ) : (
                        ''
                    )}
                </Box>
                {authStateError ? (
                    <Alert variant="filled" severity="error">
                        {authStateError.message}
                    </Alert>
                ) : (
                    ''
                )}
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;
