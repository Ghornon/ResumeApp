import { Grid, TextField, debounce } from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

const Summary = () => {
    console.log('Summary');
    const { resumeId } = useParams();

    const summary = useResumeStore((state) => state.summary);
    const setSummary = useResumeStore((state) => state.setSummary);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        setSummary(value);
        debouncedSaveDocument(value);
    };

    const saveDocument = (resumeData: string) => {
        if (resumeId) {
            const resumeRef = doc(db, 'resumes', resumeId);

            console.log('Saving data', resumeId, resumeData);
            updateDoc(resumeRef, { summary: resumeData });
        }
    };

    const debouncedSaveDocument = useCallback(
        debounce((resumeData: string) => saveDocument(resumeData), 1000),
        [],
    );

    return (
        <Grid item xs={12}>
            <TextField
                fullWidth
                id="summary"
                name="summary"
                label="Summary"
                placeholder="Summary"
                value={summary}
                multiline
                onChange={handleFormChange}
            />
        </Grid>
    );
};

export default Summary;
