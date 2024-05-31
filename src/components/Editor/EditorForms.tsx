import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { useState, useCallback } from 'react';
import { ResumeType } from '../../types/Resume.types';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { PersonalDetails } from './PersonalDetails';
import { EmploymentHistory } from './EmploymentHistory';

const EditorForms = ({
    resumeData,
    setResumeData,
}: {
    resumeData: ResumeType;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeType>>;
}) => {
    const { resumeId } = useParams();
    const [template, setTemplate] = useState('Default');

    const handleTemplateChange = (event: SelectChangeEvent) => {
        setTemplate(event.target.value as string);
        setResumeData({
            ...resumeData,
            [template]: event.target.value,
        });
    };

    const saveDocument = (resumeData: ResumeType) => {
        if (resumeId) {
            const resumeRef = doc(db, 'resumes', resumeId);

            console.log('Saving data', resumeId, resumeData);
            setDoc(resumeRef, { ...resumeData });
        }
    };

    const debouncedSaveDocument = useCallback(
        debounce((resumeData: ResumeType) => saveDocument(resumeData), 1000),
        [],
    );

    const handleFormChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
        event,
    ) => {
        const { name, value } = event.target;

        const path = name.split('.');
        const finalProp = path.pop();

        const newData = {
            ...resumeData,
        };

        let pointer: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [index: string]: any;
        } = newData;

        path.forEach((element) => {
            pointer[element] = { ...pointer[element] };
            pointer = pointer[element];
        });

        if (finalProp) pointer[finalProp] = value;

        setResumeData(newData);
        debouncedSaveDocument(newData);
    };

    return (
        <Box
            component="form"
            sx={{
                maxHeight: '100vh',
                paddingY: 2,
                overflowY: 'scroll',
            }}
            width={{ xs: '100%', md: '50%' }}>
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
                    Resume name
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Resume name"
                            id="name"
                            name="name"
                            value={resumeData.name}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Template</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={template}
                                label="Template"
                                onChange={handleTemplateChange}>
                                <MenuItem value="Default">Default</MenuItem>
                                <MenuItem value="Test">Test</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <PersonalDetails resumeData={resumeData} handleFormChange={handleFormChange} />

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
                    Summary
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="summary"
                            name="summary"
                            label="Summary"
                            placeholder="Summary"
                            value={resumeData.summary}
                            multiline
                            onChange={handleFormChange}
                        />
                    </Grid>
                </Grid>
            </Box>

            <EmploymentHistory resumeData={resumeData} handleFormChange={handleFormChange} />
        </Box>
    );
};

export default EditorForms;
