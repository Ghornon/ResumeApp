import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    debounce,
} from '@mui/material';
import EditorFieldBox from './EditorFieldBox';
import { useResumeStore } from '../../store/ResumeStore';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

const BaseResumeData = () => {
    const name = useResumeStore((state) => state.name);
    const setName = useResumeStore((state) => state.setName);
    const template = useResumeStore((state) => state.template);
    const setTemplate = useResumeStore((state) => state.setTemplate);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        setName(value);
        debouncedSaveDocument(value);
    };

    const handleTemplateChange = (event: SelectChangeEvent) => {
        setTemplate(event.target.value as string);
    };

    const { resumeId } = useParams();
    const saveDocument = useMemo(
        () => (resumeData: string) => {
            if (resumeId) {
                const resumeRef = doc(db, 'resumes', resumeId);

                console.log('Saving data', resumeId, resumeData);
                updateDoc(resumeRef, { name: resumeData });
            }
        },
        [resumeId],
    );

    const debouncedSaveDocument = useMemo(
        () => debounce((resumeData: string) => saveDocument(resumeData), 1000),
        [saveDocument],
    );

    return (
        <EditorFieldBox title={'Template Options'}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Resume name"
                    id="name"
                    name="name"
                    value={name}
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
                        <MenuItem value="Test">Test</MenuItem>
                        <MenuItem value="Test 2">Test 2</MenuItem>
                        <MenuItem value="Template 3">Template 3</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </EditorFieldBox>
    );
};

export default BaseResumeData;
