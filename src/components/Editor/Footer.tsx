import { Grid, TextField, debounce } from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

const Footer = () => {
    const { resumeId } = useParams();

    const footer = useResumeStore((state) => state.footer);
    const setFooter = useResumeStore((state) => state.setFooter);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        setFooter(value);
        debouncedSaveDocument(value);
    };

    const saveDocument = useMemo(
        () => (resumeData: string) => {
            if (resumeId) {
                const resumeRef = doc(db, 'resumes', resumeId);

                console.log('Saving data', resumeId, resumeData);
                updateDoc(resumeRef, { footer: resumeData, timestamp: Timestamp.now() });
            }
        },
        [resumeId],
    );

    const debouncedSaveDocument = useMemo(
        () => debounce((resumeData: string) => saveDocument(resumeData), 1000),
        [saveDocument],
    );

    return (
        <Grid item xs={12}>
            <TextField
                fullWidth
                id="footer"
                name="footer"
                label="Footer"
                placeholder="Footer"
                value={footer}
                multiline
                onChange={handleFormChange}
            />
        </Grid>
    );
};

export default Footer;
