import * as React from 'react';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, IconButton, Paper, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { SignUpType } from '../../types/SignUp.types';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import handleSocialLogin from '../../helpers/handleSocialLogin';
import logo from '../../../public/idea.png';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        retype: '',
        firstName: '',
        lastName: '',
    });

    const [validationErrors, setValidationErrors] = useState({} as SignUpType);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [signInWithGithub] = useSignInWithGithub(auth);

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
                photoURL: '',
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Logo" style={{ width: '40px', height: 'auto' }} />
                </Box>
                <Box sx={{ ml: 1, textAlign: 'right' }}>
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
                    <Typography variant="subtitle2" color="gray" sx={{ fontSize: '10px', mt: -1 }}>
                        by Dreamteam
                    </Typography>
                </Box>
            </Box>
            <Typography
                component="h1"
                variant="h5"
                sx={{ width: '100%', textAlign: 'left', fontWeight: 500, mt: 2 }}>
                Create your Account
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
                            helperText={validationErrors.lastName ? validationErrors.lastName : ''}
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
                            helperText={validationErrors.email ? validationErrors.email : ''}
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
                            helperText={validationErrors.password ? validationErrors.password : ''}
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
                            helperText={validationErrors.retype ? validationErrors.retype : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'start' }}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="Receive updates, promotions, and inspiration via email."
                        />
                    </Grid>
                </Grid>
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
                    Sign Up
                </Button>
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
        </Paper>
    );
};

export default SignUpForm;
