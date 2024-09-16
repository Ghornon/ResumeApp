import { useState } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthForms = () => {
    const [signIn, setSignIn] = useState(false);

    return (
        <Container
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 6,
                minWidth: '100%',
                width: '100%',
                maxWidth: '100%',
                height: '100%',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    borderRadius: '5px',
                    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
                    minWidth: '300px',
                    width: '100%',
                    maxWidth: '700px',
                    height: '100%',
                    minHeight: '700px',
                    maxHeight: '1500px',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 0 300px',
                        backgroundColor: '#fbfbfb',
                        position: 'relative',
                        height: '700px',
                        overflow: 'hidden',
                    }}>
                    <Box
                        // Item
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            // Width: {xs: '100%', sm: '50%'},
                            minWidth: '300px',
                            transition: 'all 0.6s ease-in-out',
                            ...(signIn
                                ? { transform: 'translateX(100%)', opacity: 0, height: 0 }
                                : { opacity: 1, zIndex: 5, height: '100%' }),
                        }}>
                        <SignUpForm />
                    </Box>

                    <Box
                        // Item
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            // Width: {xs: '100%', sm: '50%'},
                            minWidth: '300px',
                            transition: 'all 0.6s ease-in-out',
                            ...(signIn
                                ? {
                                      transform: 'translateX(0)',
                                      opacity: 1,
                                      zIndex: 5,
                                      height: '100%',
                                  }
                                : {
                                      opacity: 0,
                                      zIndex: 0,
                                      height: 0,
                                      transform: 'translateX(-100%)',
                                  }),
                        }}>
                        <SignInForm />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 0 300px',
                        height: '100%',
                        position: 'relative',
                        background: 'linear-gradient(to right, #4bd2d2, #3ca8a8)',
                        zIndex: 100,
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: '1 0 100%',
                            color: '#fbfbfb',
                            position: 'relative',
                            height: '700px',
                            overflow: 'hidden',
                        }}>
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                padding: '20px',
                                textAlign: 'center',
                                transition: 'all 0.6s ease-in-out',
                                ...(signIn
                                    ? { transform: 'translateX(-100%)', opacity: 0, zIndex: 0 }
                                    : { transform: 'translateX(0)', opacity: 1, zIndex: 500 }),
                            }}>
                            <Typography variant="h4">Welcome Back!</Typography>
                            <Typography>
                                To keep connected with us please login with your personal info
                            </Typography>
                            <Button
                                sx={{ mt: 1 }}
                                variant="outlined"
                                color="inherit"
                                onClick={() => setSignIn(true)}>
                                Sign In
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                padding: '20px',
                                textAlign: 'center',
                                transition: 'all 0.6s ease-in-out',
                                ...(signIn
                                    ? { transform: 'translateX(0%)', opacity: 1, zIndex: 500 }
                                    : { transform: 'translateX(100%)', opacity: 0, zIndex: 0 }),
                            }}>
                            <Typography variant="h4">Hello, Friend!</Typography>
                            <Typography>
                                Enter your personal details and start your journey with us
                            </Typography>
                            <Button
                                sx={{ mt: 1 }}
                                variant="outlined"
                                color="inherit"
                                onClick={() => setSignIn(false)}>
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
export default AuthForms;
