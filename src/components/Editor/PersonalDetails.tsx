import { Grid, TextField, debounce } from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';
import { doc, updateDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { ResumeType } from '../../types/Resume.types';

export const PersonalDetails = () => {
    console.log('Rebuilding personal details');
    const personalDetails = useResumeStore((state) => state.personalDetails);
    const setPersonalDetails = useResumeStore((state) => state.setPersonalDetails);

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

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const newState = { ...personalDetails };
        newState[name] = value;

        setPersonalDetails(newState);
        debouncedSaveDocument(newState);
    };

    const { resumeId } = useParams();
    const saveDocument = (resumeData: ResumeType) => {
        if (resumeId) {
            const resumeRef = doc(db, 'resumes', resumeId);

            console.log('Saving data', resumeId, resumeData);
            updateDoc(resumeRef, { personalDetails: resumeData });
        }
    };

    const debouncedSaveDocument = useCallback(
        debounce((resumeData: ResumeType) => saveDocument(resumeData), 1000),
        [],
    );

    return (
        <>
            {Object.entries(personalDetailsFields).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={`personalDetails.${key}`}>
                    <TextField
                        fullWidth
                        label={value}
                        id={`personalDetails.${key}`}
                        name={`${key}`}
                        value={personalDetails[key]}
                        onChange={handleFormChange}
                    />
                </Grid>
            ))}
        </>
    );
};
