import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { DocumentSnapshot, doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { ResumeType } from '../types/Resume.types';
import { db } from '../config/firebase';
import { useParams } from 'react-router-dom';

const EditorForms = ({ resumeSnapshot }: { resumeSnapshot: DocumentSnapshot }) => {
    const { resumeId } = useParams();
    const [formData, setFormData] = useState({
        personalDetails: {
            jobTitle: '',
            photoUrl: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            country: '',
            city: '',
        },
        name: '',
        summary: '',
    } as ResumeType);

    const [template, setTemplate] = useState('Default');

    const handleTemplateChange = (event: SelectChangeEvent) => {
        setTemplate(event.target.value as string);
        setFormData({
            ...formData,
            [template]: event.target.value,
        });
    };

    const saveData = async () => {
        if (resumeId) {
            const resumeRef = doc(db, 'resumes', resumeId);

            console.log('Saving data', resumeId, formData);
            await setDoc(resumeRef, formData);
        }
    };

    const handleFormChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
        event,
    ) => {
        const { name, value } = event.target;

        const nestedObject = name.split('.');

        if (nestedObject.length > 1) {
            setFormData({
                ...formData,
                [nestedObject[0]]: {
                    ...formData[nestedObject[0]],
                    [nestedObject[1]]: value as string,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value as string,
            });
        }

        console.log(name, value);
    };

    useEffect(() => {
        console.log('Loading');
        const data = resumeSnapshot.data();
        setFormData({
            ...formData,
            ...data,
        });
    }, []);

    const personalDetails = [
        'jobTitle',
        'photoUrl',
        'firstName',
        'lastName',
        'email',
        'phone',
        'country',
        'city',
    ];

    return (
        <Box
            component="form"
            sx={{
                maxHeight: '100vh',
                paddingY: 2,
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
                            value={formData.name}
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
                    {personalDetails.map((element) => (
                        <Grid item xs={12} sm={6} key={`personalDetails.${element}`}>
                            <TextField
                                fullWidth
                                label={element}
                                id={`personalDetails.${element}`}
                                name={`personalDetails.${element}`}
                                value={formData.personalDetails[element]}
                                onChange={handleFormChange}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
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
                            multiline
                            onChange={handleFormChange}
                        />
                    </Grid>
                </Grid>
            </Box>
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button variant="outlined" fullWidth onClick={saveData}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default EditorForms;
