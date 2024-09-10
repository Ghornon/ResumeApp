import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { Container, Grid, Button, Typography, Box } from "@mui/material";
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';


const AuthForms = () => {
    const [signIn, setSignIn] = useState(false);

  return (
    <Container component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width:'100%',
          height: '100%'
          // minWidth: '300px',
          // width: '400px'
    }}>
            {/* <CssBaseline /> */}
    <Box
      sx={{
        display: 'block',
        marginTop: 8,
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
        overflow: 'hidden',
        minWidth: '300px',
        width: '700px',
        maxWidth: '700px',
        // minWidth: '300px',
        height: '100%',
        minHeight: '100%'
      }}
    >
      <Box sx={{position: 'relative', width:'50% ',height: '100%' 
        // overflow: 'hidden'
        }}>
        {/* Sign Up */}
        <Box
          // item
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            // width: {xs: '100%', sm: '50%'},
            minWidth: '300px',
            transition: 'all 0.6s ease-in-out',
            ...(signIn ? { transform: 'translateX(100%)', opacity: 0, height: 0} : { opacity: 1, zIndex: 5, height: '100%'}),
          }}
        >
          <SignUpForm/>
        </Box>

        {/* Sign In */}
        <Box
          // item
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            // width: {xs: '100%', sm: '50%'},
            minWidth: '300px',
            transition: 'all 0.6s ease-in-out',
            ...(signIn ? { transform: 'translateX(0)', opacity: 1, zIndex: 5, height: '100%'}:{ opacity: 1, zIndex: 5, height: 0, transform: 'translateX(100%)' }),
          }}
        >
          <SignInForm/>
        </Box>

        
      </Box>
        {/* Overlay */}
      <Box
          sx={{
            // display: {xs: 'none', sm: 'block'},
            minWidth: '300px',
            position: 'relative',
            top: 0,
            bottom: 0,
            left: '50%',
            width: {xs: '100%', sm: '50%'},
            minWidth: '300px',
            height: '100%',
            minHeight: '700px',
            overflow: 'hidden',
            transition: 'transform 0.6s ease-in-out',
            zIndex: 100,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(to right, #4bd2d2, #3ca8a8)',
              color: '#ffffff',
              position: 'relative',
              left: '-100%',
              top: 0,
              bottom: 0,
              height: '700px',
              width: '200%',
              transition: 'transform 0.6s ease-in-out',
              transform: signIn ? 'translateX(0)' : 'translateX(50%)',
            }}
          >
            <Grid container>
              {/* Left Overlay Panel */}
              <Grid item xs={6} sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h4">Welcome Back!</Typography>
                <Typography>
                  To keep connected with us please login with your personal info
                </Typography>
                <Button sx={{mt:1}} variant="outlined" color="inherit" onClick={() => setSignIn(true)}>
                  Sign In
                </Button>
              </Grid>

              {/* Right Overlay Panel */}
              <Grid item xs={6} sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h4">Hello, Friend!</Typography>
                <Typography>
                  Enter your personal details and start your journey with us
                </Typography>
                <Button sx={{mt:1}} variant="outlined" color="inherit" onClick={() => setSignIn(false)}>
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Box>
    </Container>
  );
}
export default AuthForms;
