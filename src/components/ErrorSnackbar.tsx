import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';

const ErrorSnackbar = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(true);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                {children}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;
