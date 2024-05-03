import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const FormResume = () => {
    const [formData, setFormData] = useState({});
    const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Box
            component="form"
            sx={{ display: 'flex', flex: '1 1 0', alignItems: 'center', flexDirection: 'column', overflowY:'scroll', maxHeight: '100vh'}}>
            <Typography
                variant="h6"
                sx={{ textTransform: 'uppercase', color: 'primary', fontWeight: 'bold' }}>
                Personal Detail
            </Typography>
            <Box sx={{width:'100%', display: 'flex', flexDirection:'row', flexWrap:'wrap', gap:'1rem', minHeight:'3000px'}}>
                <TextField
                    margin="normal"
                    // required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="email"
                    // autoComplete="email"
                    autoFocus
                    onChange={handleFormChange}
                    sx={{
                        flex: '1 1 250px',
                    }}
                />
                <TextField
                    margin="normal"
                    // required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    // autoComplete="email"
                    autoFocus
                    onChange={handleFormChange}
                    sx={{
                        flex: '1 1 250px',
                    }}
                />
            </Box>
        </Box>
    );
};

export default FormResume;
