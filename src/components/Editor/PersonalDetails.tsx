import { Grid, TextField } from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';

export const PersonalDetails = () => {
    const personalDetails = useResumeStore((state) => state.resume.personalDetails);
    const setValue = useResumeStore((state) => state.setValue);

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
        <>
            {Object.entries(personalDetailsFields).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={`personalDetails.${key}`}>
                    <TextField
                        fullWidth
                        label={value}
                        id={`personalDetails.${key}`}
                        value={personalDetails[key]}
                        onChange={(event) => setValue(`personalDetails.${key}`, event.target.value)}
                    />
                </Grid>
            ))}
        </>
    );
};
