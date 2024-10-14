import {
    Avatar,
    Box,
    Button,
    FormHelperText,
    Grid2,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useEffect, useState } from 'react';
import {
    deleteUser,
    sendEmailVerification,
    updateEmail,
    updatePassword,
    updateProfile,
} from 'firebase/auth';
import SuccessSnackbar from '../components/SuccessSnackbar';
import ErrorSnackbar from '../components/ErrorSnackbar';

const Profile = () => {
    const [user] = useAuthState(auth);

    const [personalDetails, setPersonalDetails] = useState({
        uid: user?.uid || '',
        photoUrl: user?.photoURL || '',
        displayName: user?.displayName || '',
        email: user?.email || '',
        emailVerified: user?.emailVerified || false,
        password: '',
        retypePassword: '',
        deleteAccount: '',
    });

    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState('');

    const updateUserProfile = async () => {
        if (!user) return;

        if (personalDetails.email != user.email)
            await updateEmail(user, personalDetails.email)
                .then(() => {
                    setSnackbarMessage('Email has been updated');
                })
                .catch((error) => {
                    setError(error.message);
                });

        if (
            personalDetails.displayName != user.displayName ||
            personalDetails.photoUrl != user.photoURL
        )
            await updateProfile(user, {
                displayName: personalDetails.displayName,
                photoURL: personalDetails.photoUrl,
            })
                .then(() => {
                    setSnackbarMessage('Update successful');
                })
                .catch((error) => {
                    setError(error.message);
                });
    };

    const updateUserPassword = async () => {
        if (!user) return;

        if (
            personalDetails.password.length == 0 ||
            personalDetails.password != personalDetails.retypePassword
        ) {
            setError("Passwords doesn't match or do not meet password policy");
            return;
        }

        await updatePassword(user, personalDetails.password)
            .then(() => {
                setSnackbarMessage('Password has been updated');
            })
            .catch((error) => {
                setError(error);
            });
    };

    const sendUserEmailVerification = async () => {
        if (!user) return;

        await sendEmailVerification(user)
            .then(() => {
                setSnackbarMessage('Verification email has been sent');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const deleteUserAccount = async () => {
        if (!user) return;

        if (personalDetails.deleteAccount != 'delete') return;

        await deleteUser(user)
            .then(() => {
                setSnackbarMessage('Account has been removed');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    useEffect(() => {
        setPersonalDetails({
            ...personalDetails,
            ...{
                uid: user?.uid || '',
                photoUrl: user?.photoURL || '',
                displayName: user?.displayName || '',
                email: user?.email || '',
                emailVerified: user?.emailVerified || false,
            },
        });
    }, [user]);

    return (
        <>
            {snackbarMessage && snackbarMessage.length > 0 ? (
                <SuccessSnackbar>{snackbarMessage}</SuccessSnackbar>
            ) : null}
            {error && error.length > 0 ? <ErrorSnackbar>{error}</ErrorSnackbar> : null}
            <Box>
                <Typography
                    variant="h4"
                    sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}
                    gutterBottom>
                    Settings
                </Typography>

                <Grid2 container spacing={2} size={{ xs: 12, md: 8 }} sx={{ my: 2 }}>
                    <Grid2 size={12}>
                        <Typography
                            variant="h5"
                            sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}
                            gutterBottom>
                            Account
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Here, you can update your account information such as your profile
                            picture, name and username.
                        </Typography>
                    </Grid2>
                    <Grid2 size={12} sx={{ display: 'flex' }}>
                        <IconButton size="medium">
                            <Avatar
                                sx={{ width: 40, height: 40 }}
                                src={personalDetails.photoUrl || ''}
                                alt={personalDetails.displayName || 'User Avatar'}
                            />
                        </IconButton>
                        <TextField
                            fullWidth
                            label="Photo URL"
                            value={personalDetails.photoUrl}
                            onChange={(event) =>
                                setPersonalDetails({
                                    ...personalDetails,
                                    photoUrl: event.target.value,
                                })
                            }
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={personalDetails.email}
                            onChange={(event) =>
                                setPersonalDetails({
                                    ...personalDetails,
                                    email: event.target.value,
                                })
                            }
                        />
                        <FormHelperText
                            id="delete-helper-text"
                            sx={{
                                color: personalDetails.emailVerified
                                    ? 'success.main'
                                    : 'error.main',
                            }}>
                            {personalDetails.emailVerified ? 'Email verified' : 'Email unverified'}
                        </FormHelperText>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Display name"
                            value={personalDetails.displayName}
                            onChange={(event) =>
                                setPersonalDetails({
                                    ...personalDetails,
                                    displayName: event.target.value,
                                })
                            }
                        />
                    </Grid2>
                    <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{ marginRight: 2 }}
                            disabled={personalDetails.emailVerified}
                            onClick={sendUserEmailVerification}>
                            Send verification email
                        </Button>
                        <Button variant="outlined" size="large" onClick={updateUserProfile}>
                            Save changes
                        </Button>
                    </Grid2>
                </Grid2>

                <Grid2 container spacing={2} size={{ xs: 12, md: 8 }} sx={{ my: 2 }}>
                    <Grid2 size={12}>
                        <Typography
                            variant="h5"
                            sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}
                            gutterBottom>
                            Security
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            In this section, you can change your password.
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="password"
                            label="New password"
                            value={personalDetails.password}
                            onChange={(event) =>
                                setPersonalDetails({
                                    ...personalDetails,
                                    password: event.target.value,
                                })
                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Retype new password"
                            value={personalDetails.retypePassword}
                            onChange={(event) =>
                                setPersonalDetails({
                                    ...personalDetails,
                                    retypePassword: event.target.value,
                                })
                            }
                        />
                    </Grid2>
                    <Grid2
                        size={12}
                        sx={{ display: 'flex', justifyContent: 'right', alignContent: 'center' }}>
                        <Button variant="outlined" size="large" onClick={updateUserPassword}>
                            Update password
                        </Button>
                    </Grid2>
                </Grid2>

                <Grid2 container spacing={2} size={{ xs: 12, md: 8 }} sx={{ my: 2 }}>
                    <Grid2 size={12}>
                        <Typography
                            variant="h5"
                            sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}
                            gutterBottom>
                            Danger Zone
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            In this section, you can delete your account and all the data associated
                            to your user, but please keep in mind that this action is irreversible.
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Delete Account"
                            placeholder="delete"
                            name="delete"
                            value={personalDetails.deleteAccount}
                            onChange={(event) =>
                                setPersonalDetails({
                                    ...personalDetails,
                                    deleteAccount: event.target.value,
                                })
                            }
                        />

                        <FormHelperText id="delete-helper-text">
                            Type <b>delete</b> to confirm deleting your account.
                        </FormHelperText>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12 }}>
                        <Button variant="contained" color="error" onClick={deleteUserAccount}>
                            Delete Account
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    );
};

export default Profile;
