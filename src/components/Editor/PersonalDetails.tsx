import { Box, Grid, TextField, Typography } from '@mui/material';
import { ResumeType } from '../../types/Resume.types';
export const PersonalDetails = ({
    resumeData,
    handleFormChange,
}: {
    resumeData: ResumeType;
    handleFormChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) => {
    const personalDetailsFields = {
        jobTitle: 'Job title',
        photoUrl: 'Photo URL',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        country: 'Country',
        city: 'City',
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                paddingX: 10,
                paddingY: 2,
            }}>
            <Typography variant="h4" component="h4">
                Personal Details
            </Typography>
            <Grid container spacing={2}>
                {Object.entries(personalDetailsFields).map(([key, value]) => (
                    <Grid item xs={12} sm={6} key={`personalDetails.${key}`}>
                        <TextField
                            fullWidth
                            label={value}
                            id={`personalDetails.${key}`}
                            name={`personalDetails.${key}`}
                            value={resumeData.personalDetails[key]}
                            onChange={handleFormChange}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
