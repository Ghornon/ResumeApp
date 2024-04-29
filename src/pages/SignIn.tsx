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
import { Alert, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { SignInType } from '../types/SignIn.types';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import handleSocialLogin from '../helpers/handleSocialLogin';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState({} as SignInType);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [signInWithGithub] = useSignInWithGithub(auth);

    const validateForm = () => {
        const validationErrors = {} as SignInType;

        if (!formData.email.trim()) validationErrors.email = 'Email is required';
        else if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(formData.email))
            validationErrors.email = 'Email is not valid';

        if (!formData.password.trim()) validationErrors.password = 'Password is required';
        else if (formData.password.length < 6)
            validationErrors.password = 'Password should be least 6 char';

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
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
        } catch (e) {
            const error = e instanceof FirebaseError;
            if (error) {
                setValidationErrors({ ...validationErrors, firebase: e.message });
                console.error(e);
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                        error={validationErrors.email ? true : false}
                        helperText={validationErrors.email ? validationErrors.email : ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        error={validationErrors.password ? true : false}
                        helperText={validationErrors.password ? validationErrors.password : ''}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Don't have an account? Sign Up
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
                            or sign in with:
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
                        <IconButton
                            color="primary"
                            aria-label="Sign in with Google account"
                            onClick={() =>
                                handleSocialLogin(
                                    signInWithGoogle,
                                    validationErrors,
                                    setValidationErrors,
                                )
                            }>
                            <GoogleIcon />
                        </IconButton>

                        <IconButton
                            color="primary"
                            aria-label="Sign in with GitHub account"
                            onClick={() =>
                                handleSocialLogin(
                                    signInWithGithub,
                                    validationErrors,
                                    setValidationErrors,
                                )
                            }>
                            <GitHubIcon />
                        </IconButton>
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
            </Box>
        </Container>
    );
};

export default SignIn;
