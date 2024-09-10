import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, IconButton, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { SignInType } from '../../types/SignIn.types';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import handleSocialLogin from '../../helpers/handleSocialLogin';
import logo from '../../../public/idea.png';

const SignInForm = () => {
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
                setValidationErrors({
                    ...validationErrors,
                    firebase: e.message,
                });
                console.error(e);
            }
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyItems: 'center',
                padding: '20px',
                textAlign: 'center',
                boxShadow: 'none',
            }}>
            <Box
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'left',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: '40px',
                            height: 'auto',
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        ml: 1,
                        textAlign: 'right',
                    }}>
                    <Typography
                        variant="h5"
                        sx={{
                            whiteSpace: 'nowrap',
                            fontWeight: 800,
                            textShadow: '1px 3px 3px rgba(198, 198, 198, 0.3)',
                            background: 'linear-gradient(to right, #4bd2d2, #3ca8a8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline-block',
                        }}>
                        resucraft
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="gray"
                        sx={{
                            fontSize: '10px',
                            mt: -1,
                        }}>
                        by Dreamteam
                    </Typography>
                </Box>
            </Box>
            <Typography
                component="h1"
                variant="h5"
                sx={{
                    width: '100%',
                    textAlign: 'left',
                    fontWeight: 500,
                    mt: 2,
                }}>
                Sign in your Account
            </Typography>
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <IconButton
                    color="inherit"
                    aria-label="Sign in with Google account"
                    onClick={() =>
                        handleSocialLogin(signInWithGoogle, validationErrors, setValidationErrors)
                    }>
                    <GoogleIcon />
                </IconButton>

                <IconButton
                    color="inherit"
                    aria-label="Sign in with GitHub account"
                    onClick={() =>
                        handleSocialLogin(signInWithGithub, validationErrors, setValidationErrors)
                    }>
                    <GitHubIcon />
                </IconButton>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    mt: 0,
                }}>
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
                    sx={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 2,
                        mb: 2,
                        height: '50px',
                        background: 'linear-gradient(to right, #4bd2d2, #3ca8a8)',
                    }}>
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                </Grid>

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
        </Paper>
    );
};

export default SignInForm;
